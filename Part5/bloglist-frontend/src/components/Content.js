import { useState, useEffect } from 'react'
import blogService from '../services/blogs'
import Blog from "./Blog"

const Content = ({ user, setUser }) => {
    const [blogs, setBlogs] = useState([])

    useEffect(() => {
        blogService.getAll().then(blogs =>
          setBlogs( blogs )
        )  
    }, [])

    const logoutHandler = () => {
        window.localStorage.removeItem('BlogUser')
        setUser(null)
    }

    return (
        <div>
            <div>
                {user.name} logged in
                <button onClick={() => logoutHandler()}>
                    LogOut
                </button>
            </div>
            {blogs.map(blog => <Blog key={blog.id} blog={blog} />)}
        </div>
)}
  
export default Content