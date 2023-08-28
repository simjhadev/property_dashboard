import mongoose from 'mongoose';
import * as dotenv from 'dotenv';
import Property from '../mongodb/models/property.js';
import User from '../mongodb/models/user.js';


import { v2 as cloudinary } from 'cloudinary';
dotenv.config();

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

const getAllProperties = async (req, res) => {
    
    const { _end, _order, _start, _sort, address_like = "", propertyType = "" } = req.query;
    
    let query = {};

    
    if(address_like){
        const addressFilter = { $regex: address_like, $options: 'i'};
        query = {
            $or : [
            {addressLine1 : addressFilter},
            {addressLine2 : addressFilter},
            {city : addressFilter},
            {state : addressFilter},
            {zipcode : addressFilter}
            ]
        };
    }
    if(propertyType !== ''){
        query.propertyType = propertyType;
    }
    console.log(query);
    
    try{
        const count = await Property.countDocuments({ query });
        
        const properties = await Property
        .find(query)
        .limit(_end)
        .skip(_start)
        .sort({[_sort]: _order })

        res.header('x-total-count', count);
        res.header('Access-Control-Expose-Headers','x-total-count');

        res.status(200).json(properties);





    }catch(error){
        console.log(error);
        res.status(500).json({ message: 'Error in All Property method' });
    }
};

const getPropertyDetails = async (req, res) => {
    try{
        const { id } = req.params;
        const propertyExists = await Property.findOne({_id: id}).populate('creator');
        //console.log(propertyExists);
        if(propertyExists){
            res.status(200).json(propertyExists)
        }else{
            res.status(404).json({message: 'Property not found.'})
        }

    }catch(error){
        console.log('Error in Get Property Details.', error);
    }

};

const createProperty = async (req, res) => {
    
    try{
        const { addressLine1, addressLine2, city, state, zipcode, description, propertyType, price, photo, email } = req.body;

       
        // Start a new session
        const session = await mongoose.startSession();
        session.startTransaction();
    
        const user = await User.findOne({email}).session(session);
    
        if(!user) throw new Error('User not found');
       
        const photoUrl = await cloudinary.uploader.upload(photo);
        //console.log("Inside create property", photoUrl);
        
        const newProperty = await Property.create({
            addressLine1, 
            addressLine2, 
            city, 
            state, 
            zipcode,
            description,
            propertyType,
            price,
            photo: photoUrl.url,
            creator: user._id
        });
    
        user.allProperties.push(newProperty._id);
        await user.save({ session });
        await session.commitTransaction(); 
    
        res.status(200).json({ message: 'Property created successfully.'});
    }
    catch(error){
        console.log(error);
        res.status(500).json({ message: 'Error in Create Property method' });
    }
};

const updateProperty = async (req, res) => {
    try{
        const { id } = req.params;
        const { addressLine1, addressLine2, city, state, zipcode, description, propertyType, price, photo, email } = req.body;

        const photoUrl = await cloudinary.uploader.upload(photo);

        await Property.findByIdAndUpdate(
            { _id: id },
            {
                addressLine1,
                addressLine2,
                city,
                state,
                zipcode, 
                description,
                propertyType,
                price,
                photo: photoUrl.url || photo,
            },
        );

        res.status(200).json({ message: "Property updated successfully" });


    }catch(error){
        console.log(error);
        res.status(500).json({ message: 'Error in Create Property method' });
    }
};

const deleteProperty = async (req, res) => {
    try{
        const { id } = req.params;

        const propertyToDelete = await Property.findById({
            _id: id
        }).populate('creator');

        if(!propertyToDelete) throw new Error('Property not found');

        const session = await mongoose.startSession();
        session.startTransaction();

        propertyToDelete.deleteOne({session});
        propertyToDelete.creator.allProperties.pull(propertyToDelete);

        await propertyToDelete.creator.save({session});
        await session.commitTransaction();

        res.status(200).json({ message : "Property deleted successfully"});

    }catch(error){
        console.log(error);
        res.status(500).json({ message: 'Error Deleting the Property.' });
    }
};

export{
    getAllProperties,
    getPropertyDetails,
    createProperty,
    updateProperty,
    deleteProperty,
}