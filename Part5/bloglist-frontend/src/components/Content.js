import { useState, useEffect } from 'react'
import blogService from '../services/blogs'
import BlogForm from './BlogForm'
import User from './User'
import Blogs from './Blogs'
import Togglable from './Togglable'

const Content = ({ user, setUser, setMessage }) => {
    const [blogs, setBlogs] = useState([])

    useEffect(() => {
        blogService.getAll().then(blogs =>
          setBlogs( blogs )
        )  
    }, [])

    return (
        <div>
            <User user={user} setUser={setUser} />
            <Togglable label={'Create new blog'}>
                <BlogForm blogs={blogs} setBlogs={setBlogs} setMessage={setMessage}/>
            </Togglable>
            
            <Blogs blogs={blogs} />
        </div>
)}
  
export default Content