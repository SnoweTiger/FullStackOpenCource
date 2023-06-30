import { useState, useEffect } from 'react'
import blogService from '../services/blogs'
import Blog from "./Blog"

const Content = ({ user }) => {
    const [blogs, setBlogs] = useState([])

    useEffect(() => {
        blogService.getAll().then(blogs =>
          setBlogs( blogs )
        )  
    }, [])

    return (
        <div>
            <p>{user.name} logged in</p>
            {blogs.map(blog => <Blog key={blog.id} blog={blog} />)}
        </div>
)}
  
export default Content