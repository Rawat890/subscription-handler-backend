import mongoose from "mongoose"
import { MONGO_URI } from "../config/config.js";

const connectDB = async ()=>{
 try {
  const connection = await mongoose.connect(MONGO_URI);
  console.log("Connected to mongo database -> ", connection.connection.db.databaseName);
 } catch (error) {
  console.log("Error connecting to mongo database -> ", error);
  process.exit(1);
 }
}

export default connectDB;