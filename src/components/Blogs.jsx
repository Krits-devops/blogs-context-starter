import React, { useContext } from 'react'
import { AppContext } from '../context/AppContext';
import Spinner from './Spinner';
import { useEffect } from 'react';



function Blogs() {

    const {fetchBlogPosts, loading, post} = useContext(AppContext);

    useEffect(()=>{
      fetchBlogPosts()
    },[])

  return (
    <div className='w-11/12 max-w-[670px] py-8 flex flex-col gap-y-7 mt-[66px] mb-[70px] justify-center items-center h-screen'>
        {
            loading ? (<Spinner/>) : 
            (
                post.length === 0 ? 
                (<div> <p>No Post Found</p> </div>) : (post.map((post)=> (

                    <div key={post.id}>
                        <p className='font-bold text-red-400 text-lg'>{post.title}</p>
                        <p className='text-[15px]'>
                            By <span className='italic'>{post.author}</span> on <span className='underline'>{post.category}</span>
                        </p>
                        <p className='text-[12px]'>Posted on {post.date}</p>
                        <p className='text-[15px] mt-[8px]'>{post.content}</p>

                        <div className='flex gap-x-3'>
                            {post.tags.map((tag, index)=>{
                                return <span key={index} className='text-blue-500 underline font-bold text-[12px]'>{`#${tag}`}</span>
                            })}
                        </div>

                    </div>


                ) ))

            )
        }
    </div>
  )
}

export default Blogs