import mongoose from 'mongoose';

mongoose.set('bufferCommands', false);
const connectDB = async (DATABASE_URL: string) => {
    try {
        const DB_OPTIONS = {
            dbName: "node-ts",
        }
        await mongoose.connect(DATABASE_URL, DB_OPTIONS)
        console.log('Connected Successfully...')
    } catch (error) {
        console.log(error)
    }
}

export default connectDB