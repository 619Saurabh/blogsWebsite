import React from 'react'
import Header from '../components/Header'

import { useLocation, useNavigate } from 'react-router-dom'
import Blogs from '../components/Blogs';
import Pagination from '../components/Pagination';

const TagPage = () => {

    const naviagation = useNavigate();

    const location = useLocation();

    const tag = location.pathname.split("/").at(-1).replaceAll("-"," ")
   

  return (
    <div className="w-full h-full flex flex-col gap-y-1 items-center justify-center">
        <Header/>

        <div className='w-11/12 max-w-[670px] py-5 flex gap-x-4'>
            <button 
            onClick={() => naviagation(-1)}
            className='border-2 border-gray-300 py-1 px-4 rounded-md'                              
            >
                Back
            </button>

            <h2 className='font-bold my-auto'>
                Blogs tagged <span className='underline'>#{tag}</span> 
            </h2>
            
        </div>    

            <Blogs/>

            <Pagination/>
            
        
    </div>
  )
}

export default TagPage
