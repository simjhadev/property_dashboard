import mongoose from 'mongoose';

const PropertySchema = new mongoose.Schema({
    
    addressLine1: {type: String, required: true},
    addressLine2: {type: String},
    city: {type: String, required: true},
    state: {type: String, required: true},
    zipcode: {type: String, required: true},
    description: { type: String, required: true},
    propertyType: { type: String, required: true},
    price: { type: String, required: true},
    photo: { type: String, required: true},
    creator: { type: mongoose.Schema.Types.ObjectId, ref: 'User'},

});

const PropertyModel = mongoose.model('Property', PropertySchema);

export default PropertyModel;
 