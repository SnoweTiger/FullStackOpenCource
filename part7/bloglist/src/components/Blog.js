import { useState } from 'react'
import { useDispatch } from 'react-redux'

import { setNotification } from '../reducers/notificationReducer'
import { likeBlog, deleteBlog } from '../reducers/blogsReducer'

const Blog = ({ blog, userName }) => {
    const [visible, setVisible] = useState(false)
    const dispatch = useDispatch()

    const hideWhenVisible = { display: visible ? 'none' : '' }
    const showWhenVisible = { display: visible ? '' : 'none' }

    const likeHandler = (id) => {
        const updatedBlog = { ...blog }
        updatedBlog.likes = updatedBlog.likes + 1
        dispatch(likeBlog(id, updatedBlog))
        dispatch(setNotification('Blog liked', 1, 5))
    }

    const deleteHandler = (id) => {
        dispatch(deleteBlog(id))
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
