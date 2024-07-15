import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI as string;

if (!MONGODB_URI) {
    throw new Error(
        'Please define the MONGODB_URI environment variable inside .env.local'
    );
}



let cached = global.mongoose;

if (!cached) {
    cached = global.mongoose = { conn: null, promise: null };
}

async function dbConnect() {
    if (cached.conn) {
        // If the connection is already cached, log and return it immediately
        console.log('Using existing database connection');
        return cached.conn;
    }

    if (!cached.promise) {
        // If there is no cached promise, create one
        // If no connection promise exists, create a new one
        cached.promise = mongoose.connect(MONGODB_URI, {
        }).then((mongoose) => {
            console.log('Database connected');
            return mongoose;
        });
    }

    // Wait for the connection promise to resolve and cache the connection
    cached.conn = await cached.promise;
    return cached.conn;
}

export default dbConnect;
