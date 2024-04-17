import React from 'react'
import Header from '../components/Header'
import Blogs from '../components/Blogs'
import Pagination from '../components/Pagination'
import { useLocation, useNavigate } from 'react-router-dom'


const CategoryPage = () => {

    const navigation = useNavigate();
    const location = useLocation();
    const category = location.pathname.split("/").at(-1).replaceAll("-"," ");
    //Extracting the value of category which is the last path in current location or current URL by splitting paths(pathname) on the basis of 
    //"/"(forward slash) and replcaing hyphen(-) with space(" ") if any contains in value of category
  return (
    <div className="w-full h-full flex flex-col gap-y-1 items-center justify-center">
        <Header/>

        <div className='w-11/12 max-w-[670px] py-5 flex gap-x-4'>
            <button
            onClick={() => navigation(-1)}
            className='border-2 border-gray-300 py-1 px-4 rounded-md'
            >
                Back
            </button>

            <h2 className='font-bold my-auto'>
                Blogs on <span className='underline'>{category}</span> 
            </h2>

        </div>

        <Blogs/>

        <Pagination/>
        
    </div>
  )
}

export default CategoryPage