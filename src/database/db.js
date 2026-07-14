import mongoose from "mongoose"
import { MONGO_URL } from "../config/config.js";
import { promises as dns } from 'node:dns';

dns.setServers(['8.8.8.8', '1.1.1.1']);

if (!MONGO_URL) {
 throw new Error("MONGO_URL is not defined in environment variables");
}

const connectDB = async () => {
 try {
  const connection = await mongoose.connect(MONGO_URL);
  console.log("Connected to mongo database -> ", connection.connection.db.databaseName);
 } catch (error) {
  console.log("Error connecting to mongo database -> ", error);
  process.exit(1);
 }
}

export default connectDB;