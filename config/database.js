import mongoose from "mongoose";
import dotenv from 'dotenv';
dotenv.config();

const ConnectDB = () => {
    mongoose.connect(process.env.MONGO_URL).then(() => {
        console.log("MongoDB connected successfully");
    })
}

export default ConnectDB;