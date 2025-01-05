import { use } from "react";
import { createContext, useState } from "react";
import { baseUrl } from "../baseUrl";
import { useNavigate } from "react-router-dom";


export const AppContext = createContext();

export default function AppContextProvider({children}){
    
    const [loading , setLoading] = useState(false);
    const [post, setPost] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(null);
    const navigate = useNavigate();


    async function fetchBlogPosts(page=1, tag= null, category) {
        setLoading(true);

        let url = `${baseUrl}?page=${page}`;

        if(tag){
            url += `&tag=${tag}` 
        }
        if(category){
            url += `&category=${category}`
        }

        try{
            const result = await fetch(url);
            const data = await result.json();
            console.log(data)
            setPage(data.page);
            setPost(data.posts);
            setTotalPages(data.totalPages);
        }
        catch(error){
            console.log(error);
            setPage(1)
            setPost([])
            setTotalPages(null);
        }
        setLoading(false);
    }


    function handlePageChange(page){
        navigate({search: `?page=${page}`})
        setPage(page);
    }


    const value = {
        post,
        setPost,
        loading,
        setLoading,
        page,
        setPage,
        totalPages,
        setTotalPages,
        fetchBlogPosts,
        handlePageChange
    };

    return <AppContext.Provider value={value}>
        {children}
    </AppContext.Provider>
}
