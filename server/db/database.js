import mongoose from "mongoose";
import dotenv from 'dotenv'
dotenv.config();


const connectDB = async () => {
  try {
    await mongoose.connect(process.env.BACKEND_URL);
    console.log(`Server is conected successfully`)
  } catch (error) {
   console.log(error) 
  }
}

export default connectDB; 