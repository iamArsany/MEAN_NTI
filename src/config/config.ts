import mongoose from "mongoose";
import dotenv from 'dotenv';
dotenv.config();


const DBconnection = async () => {
  try {
    await mongoose.connect(process.env.DB!).then(() => {
      console.log(`this is connected to theeee ${process.env.DB}`);
    }).catch((err) => {
      console.error("asdf",err);
    })

  } catch (err) {
    console.error("asdf",err);
    process.exit(1);
  }
}

export default DBconnection;