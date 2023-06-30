import { useState, useEffect, useRef } from 'react'
import blogService from '../services/blogs'
import BlogForm from './BlogForm'
import User from './User'
import Blogs from './Blogs'
import Togglable from './Togglable'

const Content = ({ user, setUser, setMessage }) => {
    const [blogs, setBlogs] = useState([])
    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [url, setUrl] = useState('')
    const blogFormRef = useRef()

    useEffect(() => {
        blogService.getAll().then(blogs =>
          setBlogs( blogs.sort((a,b) => b.likes - a.likes) )
        )  
    }, [])

    const addNewBlog = (event) => {
        event.preventDefault()

        blogFormRef.current.toggleVisibility()
        const blogObject = {title: title, author: author, url: url, likes: 0}
    
        blogService
          .createBlog(blogObject)
          .then(returnedBlog => {
            returnedBlog = {...returnedBlog, user:user}

            setBlogs(blogs.concat(returnedBlog))
            setTitle('')
            setAuthor('')
            setUrl('')
            setMessage({text: "Add blog", type:1})
            setTimeout(() => {
              setMessage(null)
            }, 5000)
        })
    }

    return (
        <div>
            <User user={user} setUser={setUser} />

            <Togglable label={'Create new blog'} ref={blogFormRef}>
                <BlogForm 
                    addNewBlog={addNewBlog}
                    title={title} setTitle={setTitle} 
                    author={author} setAuthor={setAuthor} 
                    url={url} setUrl={setUrl} 
                />
            </Togglable>
            
            <Blogs blogs={blogs} setBlogs={setBlogs} user={user} />
        </div>
)}
  
export default Content