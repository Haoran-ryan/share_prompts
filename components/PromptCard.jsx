'use client';

import { useState } from "react";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";
import { set } from "mongoose";

const PromptCard = ({ post, handleTagClick, handleEdit, handleDelete}) => {
  const [copiedPrompt, setCopiedPrompt] = useState("");

  const handleCopy = () => {
    setCopiedPrompt(post.prompt);
    navigator.clipboard.writeText(post.prompt);
    setTimeout(() => {
      setCopiedPrompt("");
    },3000);
  };

  return (
    <div className="prompt_card">
      <div
        className="flex justify-between items-start gap-5">
        <div 
        className="flex-1 flex justify-start items-center gap-3 cursor-pointer"
        >
          {/* profile image */}
            <Image
              src={post.author.image}
              alt='user_image'
              width={40}
              height={40}
              className='rounded-full object-contain'
            />
          {/* username */}
          <div className="flex flex-col">
            <h3 className="font-satoshi font-semibold text-gray-900">{post.author.username}</h3>
            <p className="font-inter text-sm text-gray-500">{post.author.email}</p>
          </div>
        </div>
        <div className="copy_btn"
          onClick={handleCopy}
        >
          <Image
            src={
              copiedPrompt === post.prompt
                ? "/assets/icons/tick.svg"
                : "/assets/icons/copy.svg"
            }
            alt="copy prompt"
            width={12}
            height={12}
          />
        </div>
      </div>
        <p className="my-4 font-satoshi text-sm text-gray-700">{post.prompt}</p>
        <p className="font-inter text-sm blue_gradient cursor-pointer"
          onClick={()=> handleTagClick && handleTagClick(post.tag)}
        >
          {post.tag}
          </p>
    </div>
  )
}

export default PromptCard