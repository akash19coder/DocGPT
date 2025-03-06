import mongoose from "mongoose";
import { DB_NAME } from "../contants.js";

const connectToDatabase = async () => {
  console.log(process.env.MONGODB_URI);
  try {
    const connectionInstance = await mongoose.connect(
      `${process.env.MONGODB_URI}/${DB_NAME}`,
    );

    console.log(
      `MongoDB Connected at host: ${connectionInstance.connection.host}`,
    );
  } catch (error) {
    console.log("MongoDB connection failed", error);
    process.exit(1);
  }
};
export { connectToDatabase };
