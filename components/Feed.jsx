'use client';
import { useEffect, useState } from "react";
import PromptCard from "./PromptCard";
// single-use component
const PromptCardList = ({data, handleTagClick}) =>{
  return(
    <div className="mt-16 prompt_layout">
      {data.map((post)=>(
          <PromptCard 
            key={post._id}
            post={post}
            handleTagClick={handleTagClick}
            />
        )
      )}
    </div>
  )
}

const Feed = () => {
  const [searchText, setSearchText] = useState('');
  const handleSearchChange = (e) => {
    console.log(e.target.value)
    setSearchText(e.target.value)
  };

  const handleTagClick = ()=>{
    console.log("handletagclick function")
  }

  // fetch Data from the API / DB 
  const [allPosts, setAllPosts] = useState([]);
  const fetchPosts = async () => {
    const response = await fetch("/api/prompt");
    const data = await response.json();

    setAllPosts(data);
  };

  useEffect(() => {
    fetchPosts();
  }, []);


  return (
    <section className="feed">
      <form className="relative w-full flex-center">
        <input 
          type="text" 
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