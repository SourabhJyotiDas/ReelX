import mongoose from "mongoose";

const MONGO_URI = process.env.MONGO_URI!;

if (!MONGO_URI) {
  console.log("Please define mongodb uri in env file");
}

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

export const connectToDatabase = async () => {
  try {
    if (cached.conn) {
      return cached.conn;
    }
    if (!cached.promise) {
      const opts = {
        bufferCommands: true,
        maxPoolSize: 10,
      };
      cached.promise = mongoose
        .connect(MONGO_URI, opts)
        .then(() => mongoose.connection);
    }
    try {
      cached.conn = await cached.promise;
    } catch (error) {
      cached.promise = null;
      console.log(error);
    }

    return cached.conn;
  } catch (error) {
    console.log(error);
  }
};
