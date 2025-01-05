import React, { useContext } from 'react'
import { AppContext } from '../context/AppContext';
import Spinner from './Spinner';
import { useEffect } from 'react';
import BlogDetails from './BlogDetails';



function Blogs() {

   const {fetchBlogPosts, loading, post} = useContext(AppContext);

    // useEffect(()=>{
    //   fetchBlogPosts()
    // },[])

  return (
    <div className='w-11/12 max-w-[670px] py-8 flex flex-col gap-y-7 mt-[190px] mb-[190px] justify-center items-center h-screen'>
        {
            loading ? (<Spinner/>) : 
            (
                post.length === 0 ? 
                (<div> <p>No Post Found</p> </div>) : (
                    
                    post.map((post)=> (

                    <BlogDetails key={post.id} post = {post} />


                ) ))

            )
        }
    </div>
  )
}

export default Blogs