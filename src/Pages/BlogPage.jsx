import React, { useContext, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import { baseUrl } from '../baseUrl';
import { useEffect } from 'react';
import Header from '../components/Header';
import BlogDetails from '../components/BlogDetails';


const BlogPage = () => {
  const newBaseUrl = "https://codehelp-apis.vercel.app/api/";

 
  const [blog, setBlog] = useState(null);
  const[relatedBlogs, setRelatedBlogs] = useState([]);
  const location = useLocation();//using useLocation() hook to extract the value of blogId from current location or current URL
  const navigation = useNavigate();//using useNavigate() hook to navigate to back page

 //Consuming data from context(AppContext) using useContext hook
  const {loading, setLoading} = useContext(AppContext);

  const blogId = location.pathname.split("/").at(-1); 
  //Extracting the value of blogId which is the last path in current location or current URL

  async function fetchRelatedBlogs(){
    //If we are calling an API then before that we have to show loader(spinner) in UI for that we have to set loading state variable as true
    setLoading(true);

    
    let url = `${newBaseUrl}get-blog?blogId=${blogId}`;  
    
    // console.log("URL is:");
    // console.log(url);//logging API URL on console just to check the API call going to which URL

    //Calling API
    try{

      const res = await fetch(url);//API call or Hitting GET request on API
      const data = await res.json();//Converting the response coming from API call (which is in string or JSON string format) into JSON format 
                                 //using json() method
                          
      console.log("Api Response", data);                       
      setBlog(data.blog);   
      setRelatedBlogs(data.relatedBlogs);  
      
    }

    catch(e){//If an error comes during an API call

      alert("Error in fetching data in blogId API call");
      //Re initialising everything again if an error comes while making API call
      setBlog(null);
      setRelatedBlogs([]);
    }

    //If API call is completed then remove the loader or spinner from UI
    setLoading(false);

  }
  
  useEffect(() => {
    if(blogId){//if we have blogId available then we will call async function fetchRelatedBlogs() to call an API on the basis of blogId
    
      fetchRelatedBlogs();
      
    }

  },[location.pathname])
  //So, whenever there is a change in path(i.r blogId) of location or current URL then this useEffect() will be triggered to call async 
  //function fetchRelatedBlogs() which calls an API on the basis of blogId

  return (
    <div className='w-full h-full flex flex-col gap-y-1 items-center justify-center mb-[50px]'>
      <Header/>

      <div>
        <button 
        onClick={() => navigation(-1)}
        className="border-2 border-gray-300 py-1 px-4 rounded-md mt-[20px]"
        >
          Back
        </button>
        {
          loading ? 
          (<div>
            <p>Loading</p>
          </div>)
           : //if loading state variable is false then checks if we have the data of current blog in blog state variable
          blog ?  //if current blog is available then render data of current blog and related blogs
           (
            <div>
                <BlogDetails post={blog}/> 

                <h2 className='font-bold text-2xl mt-[20px]'>Related Blogs</h2>

                {/* Rendering all the data of related blogs stored in relatedBlogs state variable array or list using map() function*/}
                
                {
                  relatedBlogs.map((post) => (
                  //for each post or blog in relatedBlogs array we are creating a <div> and inside it we are rendering a card/card component 
                  //i.e <BlogDetails/> component inside which we will pass the data of current post or blog from relatedBlogs array through
                  // props to render in UI
                    <div key={post.id}> 
                       <BlogDetails post={post}/>
                    </div>
                  ) )
                }
            </div>  
           ) 
           :// if current blog is not available then show No Blog found in UI
           (<div>             
            <p>No Blog Found</p>
          </div>)
          
        }
      </div>
    </div>
  )
}

export default BlogPage