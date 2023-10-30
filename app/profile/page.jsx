'use client';
import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

import Profile from '@components/Profile';
const MyProfile = () => {
  const { data: session} = useSession();

  const [posts, setPosts] = useState([]);

  const router = useRouter();
  const fetchPosts = async () => {
    const response = await fetch(`/api/users/${session?.user.id}/posts`);
    const data = await response.json();
    setPosts(data);
  };

  useEffect(() => {
    if(session?.user.id){
      fetchPosts();
    }
  }, [session?.user.id]);
  const handleEdit = (post) => {
     // not immediate edit, but redirect to edit page
    router.push(`/update-prompt?id=${post._id}`)

  };
  const handleDelete = async(post) => {
    const hasConfirmed = confirm('Are you sure you want to delete this post?');

    if(hasConfirmed){
      try {
        await fetch(`/api/prompt/${post._id.toString()}`, {
          method: 'DELETE'
        });
      } catch (error) {
        console.log(error);
      }
    }

    // update the posts state
    const remainingPosts = posts.filter((p) => p._id !== post._id);
    setPosts(remainingPosts);
  };
  return (
    <Profile
      name='Ryan'
      desc='Welcome to your personalize profile page'
      data={posts}
      handleEdit={handleEdit}
      handleDelete={handleDelete}
    />
  )
}

export default MyProfile