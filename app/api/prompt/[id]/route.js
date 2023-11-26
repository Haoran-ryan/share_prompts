
import {connectToDB} from "@utils/database";
import Prompt from "@models/prompt";

// GET (read)
export const GET = async(request, { params })=>{
    try{
        await connectToDB();

        const prompt = await Prompt.findById(params.id).populate('author');

        if(!prompt) return new Response("Prompt not found", {status:404})
        return new Response(JSON.stringify(prompt), {status:200})

    }catch(error){
        return new Response("Fail to get prompts", {status: 500})
    }
}


// PATCH (update)
// choose PATCH over PUT because PUT is for replacing the entire resource (full update)
export const PATCH = async (request, { params })=>{
    const { prompt, tag } = await request.json();
    try {
        await connectToDB();

        const existingPrompt = await Prompt.findById(params.id);

        if(!existingPrompt) return new Response("Prompt not found", {status:404})

        existingPrompt.prompt = prompt;
        existingPrompt.tag = tag;

        await existingPrompt.save();
        return new Response(JSON.stringify(existingPrompt), {status:200})
    }catch (error) {
        return new Response("Fail to update prompt", {status: 500})
    }
};


// DELETE

export const DELETE = async (request, { params })=>{
    try{
        await connectToDB();

        // const prompt = await Prompt.findById(params.id);
        //
        // if(!prompt) return new Response("Prompt not found", {status:404})
        //
        // await prompt.remove();

        await Prompt.findByIdAndRemove(params.id);
        return new Response('Prompt deleted successfully', {status:200})

    }catch(error){
        return new Response("Fail to delete prompt", {status: 500})
    }
};

