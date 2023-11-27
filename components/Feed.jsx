'use client';
import { useEffect, useState } from "react";
import PromptCard from "./PromptCard";
import { set } from "mongoose";
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

  const [searchedResults, setSearchedResults] = useState([]);
  const handleTagClick = (clickedTag)=>{
    setSearchText(clickedTag);

    const searchResult = filterPrompts(clickedTag);
    setSearchedResults(searchResult);
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

  const filterPrompts = (searchText) => {
    const regex = new RegExp(searchText, "i"); // i for case insensitive
    return allPosts.filter((post) =>
      regex.test(post.author.usernmae) ||
      regex.test(post.prompt) ||
      regex.test(post.tag)
      )
  };

  const [searchText, setSearchText] = useState('');
  const [searchTimeOut, setSearchTimeOut] = useState(null);
  const handleSearchChange = (e) => {
    clearTimeout(searchTimeOut);
    setSearchText(e.target.value);

    // debounce method
    setSearchTimeOut(
      setTimeout(() => {
        const searchResult = filterPrompts(e.target.value);
        setSearchedResults(searchResult);
      }, 500)
    );
  };

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
      {searchText? (
        <PromptCardList
          data={searchedResults}
          handleTagClick={handleTagClick}
        />
      ) 
      :
      (<PromptCardList
        data={allPosts}
        handleTagClick={handleTagClick}
      />)}
    </section>
  )
}

export default Feed