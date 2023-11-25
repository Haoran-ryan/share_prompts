import mongoose from "mongoose";

let isConnected = false // Database connection status

export const connectToDB = async () => {
    mongoose.set('strictQuery', true);
    if(isConnected){
        console.log("MongoDB is already connected")
        return 
    }

    try{
        
        await mongoose.connect(process.env.MONGODB_URI, {
            dbName:"share_prompt",
            useNewUrlParser:true, // in the new version, this comes by default and no longer needed to be specified
            useUnifiedTopology:true, // default in newer version, no need to specify
        })
        isConnected = true;
        console.log("MongoDB is connected")
    }catch(err){
        console.log('Failed to connect to MongoDB \n',err)
    }
};
