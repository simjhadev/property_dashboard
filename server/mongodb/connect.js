import mangoose from 'mongoose';

const connectDB = (url) => {
    mangoose.set('strictQuery', true);
    mangoose.connect(url)
    .then(()=> console.log("MongoDB connected"))
    .catch((error) => console.log("Error"+error));
}

export default connectDB;