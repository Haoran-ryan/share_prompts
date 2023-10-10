'use client';
import { useState } from "react";
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
    </section>
  )
}

export default Feed