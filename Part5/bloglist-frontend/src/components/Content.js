import { useState, useEffect } from 'react'
import blogService from '../services/blogs'
import BlogForm from './BlogForm'
import User from './User'
import Blogs from './Blogs'


const Content = ({ user, setUser }) => {
    const [blogs, setBlogs] = useState([])

    useEffect(() => {
        blogService.getAll().then(blogs =>
          setBlogs( blogs )
        )  
    }, [])

    return (
        <div>
            <User user={user} setUser={setUser} />
            <BlogForm blogs={blogs} setBlogs={setBlogs} />
            <Blogs blogs={blogs} />
        </div>
)}
  
export default Content