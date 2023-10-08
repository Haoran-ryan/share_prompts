import mongoose from "mongoose";

let isConnected = false // Database connection status

export const connnectToDB = async () => {
    mongoose.set('stridctQuery', true);
    if(isConnected){
        console.log("MongoDB is already connected")
        return 
    }

    try{
        await mongoose.connect(process.env.MONGODB_URI, {
            dbName:"share_prompt",
            useNewUrlParser:true,
            useUnifiedTopology:true,
        })

        isConnected = true;
        console.log("MongoDB is connected")
    }catch(err){
        console.log(err)
    }
};
