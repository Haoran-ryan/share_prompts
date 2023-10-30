import { connectToDB } from "@utils/database";
import Prompt from "@models/prompt";

export const GET = async(request, { params })=>{
    try{
        await connectToDB();

        const prompts = await Prompt.find({
            author: params.id,
        }).populate('author');

        return new Response(JSON.stringify(prompts), {status:200})

    }catch(error){
        return new Response("Fail to get prompts", {status: 500})
    }
}