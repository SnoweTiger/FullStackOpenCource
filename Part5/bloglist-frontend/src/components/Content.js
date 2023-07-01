import { useState, useEffect, useRef } from 'react'
import blogService from '../services/blogs'
import BlogForm from './BlogForm'
import User from './User'
import Blogs from './Blogs'
import Togglable from './Togglable'

const Content = ({ user, setUser, setMessage }) => {
    const [blogs, setBlogs] = useState('')
    const [newBlog, setNewBlog] = useState('')
    const blogFormRef = useRef()

    useEffect(() => {
        blogService.getAll().then(blogs =>
            setBlogs( blogs.sort((a,b) => b.likes - a.likes) )
        )
    }, [])

    const addBlog = (blogObject) => {

        blogFormRef.current.toggleVisibility()

        blogService
            .createBlog(blogObject)
            .then(returnedBlog => {
                returnedBlog = { ...returnedBlog, user:user }

                setBlogs(blogs.concat(returnedBlog))
                setTitle('')
                setAuthor('')
                setUrl('')
                setMessage({
                    text: 'Add blog',
                    type:1
                })
                setTimeout(() => {
                    setMessage(null)
                }, 5000)
            })
    }

    return (
        <div>
            <User user={user} setUser={setUser} />

            <Togglable label={'Create new blog'} ref={blogFormRef}>
                <BlogForm createBlog={addBlog} />
            </Togglable>

            <Blogs blogs={blogs} setBlogs={setBlogs} user={user} />
        </div>
    )
}

export default Content