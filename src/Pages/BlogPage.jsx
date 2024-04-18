import React, { useContext, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import { useEffect } from 'react';
import Header from '../components/Header';
import BlogDetails from '../components/BlogDetails';


const BlogPage = () => {
  const newBaseUrl = "https://codehelp-apis.vercel.app/api/";

 
  const [blog, setBlog] = useState(null);
  const[relatedBlogs, setRelatedBlogs] = useState([]);
  const location = useLocation();
  const navigation = useNavigate();

  const {loading, setLoading} = useContext(AppContext);

  const blogId = location.pathname.split("/").at(-1); 
  //Extracting the value of blogId which is the last path in current location or current URL

  async function fetchRelatedBlogs(){
    setLoading(true);
    let url = `${newBaseUrl}get-blog?blogId=${blogId}`;  
    
    // console.log("URL is:");
    // console.log(url);//logging API URL on console just to check the API call going to which URL

    //Calling API
    try{

      const res = await fetch(url);
      const data = await res.json();
                    
      // console.log("Api Response", data);                       
      setBlog(data.blog);   
      setRelatedBlogs(data.relatedBlogs);  
      
    }

    catch(e){//If an error comes during an API call

      alert("Error in fetching data in blogId API call");
      //Re initialising everything again 
      setBlog(null);
      setRelatedBlogs([]);
    }
    //After API call is completed then removing the loader 
    setLoading(false);

  }
  
  useEffect(() => {
    if(blogId){//if we have blogId available then we are calling async function fetchRelatedBlogs() to call an API on the basis of blogId
    
      fetchRelatedBlogs();
      
    }

  },[location.pathname])

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
           : //if loading is false then checking if we have the data of current blog 
          blog ?  //if current blog is available then render data of current blog and related blogs
           (
            <div>
                <BlogDetails post={blog}/> 

                <h2 className='font-bold text-2xl mt-[20px]'>Related Blogs</h2>

                {/* Rendering all the data of related blogs stored in relatedBlogs state variable array or list using map() function*/}
                
                {
                  relatedBlogs.map((post) => (
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
