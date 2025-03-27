import mongoose from 'mongoose';

const connectDB = async (): Promise<void> => {
    try {
        if (!process.env.MONGO_URI) {
            throw new Error("❌ MONGO_URI is not defined in environment variables.");
        }

        const conn = await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        console.log(`✅ MongoDB Connected to: ${conn.connection.host}`);
        console.log(`🗂️ Database Name: ${conn.connection.name}`);
    } catch (error) {
        console.error(`❌ Error connecting to MongoDB: ${(error as Error).message}`);
        process.exit(1);
    }
};

export default connectDB;
