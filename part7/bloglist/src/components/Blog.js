import { useState } from 'react'
import { useDispatch } from 'react-redux'

import blogService from '../services/blogs'
import { setNotification } from '../reducers/notificationReducer'

const Blog = ({ blog, userName, blogs, setBlogs }) => {
    const [visible, setVisible] = useState(false)
    const dispatch = useDispatch()

    const hideWhenVisible = { display: visible ? 'none' : '' }
    const showWhenVisible = { display: visible ? '' : 'none' }

    const likeHandler = (id) => {
        const blogObject = blog
        blogObject.likes = blogObject.likes + 1

        blogService.updateBlog(id, blogObject).then((returnedBlog) => {
            let tmpBlogs = blogs.map((b) => (b.id === id ? returnedBlog : b))
            setBlogs(tmpBlogs.sort((a, b) => b.likes - a.likes))
        })
        dispatch(setNotification('Blog liked', 1, 5))
    }

    const deleteHandler = (id) => {
        console.log(id)
        blogService.deleteBlog(id).then(() => {
            setBlogs(blogs.filter((b) => b.id !== id))
        })
        dispatch(setNotification(`Blog ${id} deleted`, 0, 5))
    }

    const toggleDetails = () => {
        setVisible(!visible)
    }

    return (
        <div>
            <div style={hideWhenVisible}>
                {blog.title} by {blog.author}
                <button onClick={toggleDetails}>Details</button>
            </div>
            <div style={showWhenVisible} className="BlogDetails">
                <p>
                    Title: {blog.title} Author: {blog.author}
                </p>
                <p>URL: {blog.url}</p>
                <p>
                    Likes: {blog.likes}
                    <button onClick={() => likeHandler(blog.id)}>
                        Like it!
                    </button>
                </p>
                <p>User: {blog.user.name}</p>
                {userName === blog.user.name && (
                    <button onClick={() => deleteHandler(blog.id)}>
                        Delete
                    </button>
                )}
                <button onClick={toggleDetails}>Close</button>
            </div>
        </div>
    )
}

export default Blog
