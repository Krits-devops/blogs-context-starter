import { useContext, useEffect } from "react"
import Blogs from "./components/Blogs"
import Header from "./components/Header"
import Pagination from "./components/Pagination"
import { AppContext } from "./context/AppContext"
import "./App.css";
import { Routes, Route, useSearchParams, useLocation } from "react-router-dom"
import Home from "./pages/Home"
import BlogPage from "./pages/BlogPage"
import TagPage from "./pages/TagPage"
import CategoryPage from "./pages/CategoryPage"

export default function App() {

const {fetchBlogPosts} = useContext(AppContext)

  const [searchParams, setSearchParams] = useSearchParams();
  const location = useLocation();

  useEffect(()=>{
    
    const page =searchParams.get('page') ?? 1 ;
    if(location.pathname.includes('tags')){
      const tag = location.pathname.split('/').at(-1).replace('-',' ');
      fetchBlogPosts(Number(page), tag);
    }
    else if(location.pathname.includes('categories')){
      const category = location.pathname.split('/').at(-1).replace('-',' ');
      fetchBlogPosts(Number(page), null, category);
    }
    else{
      fetchBlogPosts(Number(page)) 
    }

  },[location.pathname, location.search])

  return (

      // <div className="w-full h-full flex flex-col gap-y-1 justify-center items-center">
      //   <Header/>
      //   <Blogs/>
      //   <Pagination />
      // </div>


      <Routes>
        <Route path="/" element ={<Home/>} />
        <Route path="/blog/:blogId" element ={<BlogPage/>} />
        <Route path="/tags/:tag" element ={<TagPage/>} />
        <Route path="/categories/;category" element ={<CategoryPage/>} />
      </Routes>


  )
}
