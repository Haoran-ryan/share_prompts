'use client';
import { useEffect, useState } from "react";
import PromptCard from "./PromptCard";
// single-use component
const PromptCardList = ({data, handleTagClick}) =>{
  <div className="mt-16 prompt_layout">
    {data.map((post)=>(
        <PromptCard 
          key={post.id}
          id={post.id}
          handleTagClick={handleTagClick}
          />
      )
    )}
  </div>
}

const Feed = () => {
  const [searchText, setSearchText] = useState('');
  const handleSearchChange = (e) => {

  };

  // fetch Data from the API / DB 
  const [allPosts, setAllPosts] = useState([]);
  useEffect(()=>{
    const fetchPosts = async()=>{
      const res = await fetch('/api/prompts');
      const data = await res.json();

      setAllPosts(data);
    }; 
    fetchPosts();
  },[])

  return (
    <section className="feed">
      <form className="relative w-full flex-center">
        <input type="text" 
        className="search_input peer" 
        placeholder="Search for a tag or a username"
        value={searchText}
        onChange={handleSearchChange}
        required
        />
      </form>
      <PromptCardList
        data={allPosts}
        handleTagClick={handleTagClick}
      />
    </section>
  )
}

export default Feed