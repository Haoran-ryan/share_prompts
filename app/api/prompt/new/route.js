import { connectToDB } from "@utils/database";

export const POST = async(request, response)=>{
    const { userId, prompt, tag } = await request.json();
    try{
        await connectToDB();
    }catch(error){
        console.log(error);
    }
};