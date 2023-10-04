import mongoose from "mongoose";

let isConnected: boolean = false;

export async function connectToDatabase() {
  mongoose.set("strictQuery", true);
  if (!process.env.MONGODB_URL) return console.error("MISSING MONGODB_URL");
  if (isConnected) return console.log("MongoDB is already connected");
  try {
    await mongoose.connect(process.env.MONGODB_URL, {
      dbName: "DevAnswers",
    });
    isConnected = true;
    console.log("MongoDB is connected");
  } catch (error) {
    console.error("MongoDB connection failed: ", error);
    throw error;
  }
}
