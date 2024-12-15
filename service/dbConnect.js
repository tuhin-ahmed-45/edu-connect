import mongoose from "mongoose";

const MONGO_URI = process.env.MONGO_URI;

if (!MONGO_URI) {
  throw new Error("Please define the MONGO_URI environment variable in .env.local");
}

// Use global cache to handle hot reloads in Next.js
const cached = global.mongoose || { connection: null, promise: null };
global.mongoose = cached;

async function dbConnect() {
  if (cached.connection) {
    return cached.connection;
  }

  if (!cached.promise) {
    const options = {
      bufferCommands: false,
      serverSelectionTimeoutMS: 5000, // 5 seconds timeout
    };

    cached.promise = mongoose.connect(MONGO_URI, options).then((mongoose) => mongoose);
  }

  try {
    cached.connection = await cached.promise;
  } catch (error) {
    cached.promise = null; // Reset the promise on failure
    throw error;
  }

  return cached.connection;
}

export default dbConnect;
