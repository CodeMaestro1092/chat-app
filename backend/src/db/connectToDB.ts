import mongoose from "mongoose";
import config from "../../config";

const connectToMongoDB = async() => {
    try {
        await mongoose.connect(config.mongoURI as string);
        console.log("connected to MongoDb");
        
    } catch (e: any) {
        console.log("Error connecting to MongoDB has failed ", e.message);
        process.exit(1);
    }
}

export default connectToMongoDB;