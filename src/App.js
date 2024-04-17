import "./App.css";
import { useContext, useEffect } from "react";
import { AppContext } from "./context/AppContext";

import { Route, Routes, useLocation, useSearchParams } from "react-router-dom";
import Home from "./Pages/Home";
import BlogPage from "./Pages/BlogPage";
import TagPage from "./Pages/TagPage";
import CategoryPage from "./Pages/CategoryPage";




export default function App() {
  const { fetchBlogPosts } = useContext(AppContext);

  
  const[searchParams, setSearchParams] = useSearchParams();
  const location = useLocation();//useLocation() hook returns an object with properties pathname, search, hash and state

  useEffect(() => {

    //We have to extratct the page no. or value of page from search parameters or query parameters inside URL or API URL
    const page = searchParams.get("page") ?? 1;

   if(location.pathname.includes("tags")){ //Check if current location(or current URL) includes(contain) path tags in it,

    const tag = location.pathname.split("/").at(-1).replaceAll("-"," ");
    //Extracting the value of tag which is the last path in current location or current URL by splitting paths on the basis of "/" and 
    //replcaing hyphen(-) with space(" ") if any contains 
    
    fetchBlogPosts(Number(page), tag);
  }
  else if(location.pathname.includes("categories")){//Check if current location(or current URL) includes(contain) path categories in it,

    const category = location.pathname.split('/').at(-1).replaceAll("-"," ");

    fetchBlogPosts(Number(page), null, category);
  }
  else{
    
    fetchBlogPosts(Number(page));//converting the value of page in number using Number(page) method

  }

  }, [location.pathname, location.search]);//So, whenever there is a change in path  or search parameter of location or current URL then this 
  // useEffect() will be triggered 
  //So inside this useEffect() we called async function fetchBlogPosts() in a way that it can call three different APIs according to the 
  //requirement 


  return (
     //Creating or defininig all our routes for differnt pages or components
     <Routes>
         <Route path="/" element={<Home/>} />          
         <Route path="/blog/:blogId" element={<BlogPage/>}/>  
         <Route path="/tags/:tag" element={<TagPage/>} /> 
         <Route path="/categories/:category" element={<CategoryPage/>}/>
      </Routes>
    
     
   
  );
}