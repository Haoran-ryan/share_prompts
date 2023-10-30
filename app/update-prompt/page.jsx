'use client'

import { useEffect,useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";

import Form from "@components/Form";

const EditPrompt = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const promptId = searchParams.get("id");

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [post, setPost] = useState({
        prompt: "",
        tag: ""
    });

    useEffect(() => {
        const getPromptDetails = async () => {
            const response = await fetch(`/api/prompt/${promptId}`);
            const data = await response.json();

            setPost({
                prompt: data.prompt,
                tag: data.tag
            })
        }
        if(promptId) getPromptDetails();
    }, [promptId]);

    const updatePost = async (e)=>{
        e.preventDefault();
        setIsSubmitting(true);

        if(!promptId) return alert("Prompt ID is missing");
        try{
            const response = await fetch(`/api/prompt/${promptId}`,{
                method: 'PATCH',
                body: JSON.stringify({
                    prompt: post.prompt,
                    tag: post.tag
                }),
            })

            if(response.ok){
                router.push("/")
            }
        }catch(err){
            console.log(err);
        }finally{
            setIsSubmitting(false);
        }
    }
    return (
        <Form
            type="Edit"
            post={post}
            setPost={setPost}
            isSubmitting={isSubmitting}
            handleSubmit={updatePost}
        />
    )
}

export default EditPrompt;