import mongoose from "mongoose";


const connectDB = async () => {
    try {
        await mongoose.connect(`${process.env.MONGODB_URI}/e_commerce_app`);
        console.log("MongoDB Connected");
    } catch (error) {
        console.log(error);
    }
}


export default connectDB;
