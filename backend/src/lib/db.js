import mongoose from "mongoose";

export const connectDB = async()=>{
    try{
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log("Connnected to Database");
    } catch(e){
        console.log("Database Connection Error ",e);
    }
};











