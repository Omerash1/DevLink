// src/config/db.ts
import mongoose from 'mongoose';
import config from './config';

const connectDB = async (): Promise<void> => {
  try {
    // Set strictQuery to false for forward compatibility
    mongoose.set('strictQuery', false);
    
    const conn = await mongoose.connect(config.mongoURI);

    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error connecting to MongoDB: ${error instanceof Error ? error.message : String(error)}`);
    process.exit(1);
  }
};

export default connectDB;