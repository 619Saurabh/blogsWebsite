import { createContext, useState } from "react";
import { baseUrl } from "../baseUrl";
import { useNavigate } from "react-router-dom";

export const AppContext = createContext();

export default function AppContextProvider({ children }) {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(null);

  const navigate = useNavigate();

  // Fetch Blog Data
  const fetchBlogPosts = async (page = 1, tag=null, category) => {
    setLoading(true);
    //Calling three different APIs:  1)for Blog page   2)for Category page   3)for Tag page
    let url = `${baseUrl}?page=${page}`;//Normal API 
    
    if(tag){//if tag is present then API URL 
      url +=`&tag=${tag}`;
    }
    
    if(category){//if category exists then API URL 
      url +=`&category=${category}`;
    }

    try {
      const res = await fetch(url);
      const data = await res.json();
      if (!data.posts || data.posts.length === 0)
        throw new Error("Something Went Wrong");
      console.log("Api Response", data);
      setPage(data.page);
      setPosts(data.posts);
      setTotalPages(data.totalPages);
    } catch (error) {
      console.log("Error in Fetching BlogPosts", error);
      setPage(1);
      setPosts([]);
      setTotalPages(null);
    }
    setLoading(false);
  };

  // Handle When Next and Previous button are clicked
  const handlePageChange = (page) => {

    navigate({search:`?page=${page}`});
    //Changing the URL on the basis of page no.(search parameter) to navigate between pages 
    setPage(page);
  
  };

  const value = {
    posts,
    setPosts,
    loading,
    setLoading,
    page,
    setPage,
    totalPages,
    setTotalPages,
    fetchBlogPosts,
    handlePageChange,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}
