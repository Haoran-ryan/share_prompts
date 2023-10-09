'use client'

import { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";

import Form from "@components/Form";

const createPost = () => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [post, setPost] = useState({ 
        prompt: "", 
        tag: "" 
    });
    const createPost = async (e)=>{
        console.log(e)
    }
  return (
    <Form 
        type="Create"
        post={post}
        setPost={setPost}
        isSubmitting={isSubmitting}
        handleSubmit={createPost}
    />
  )
}

export default createPost;