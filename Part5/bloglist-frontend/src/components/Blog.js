import { useState } from 'react'

const Blog = ({ blog, likeHandler, deleteHandler, userName }) => {
    const [visible, setVisible] = useState(false)

    const hideWhenVisible = { display: visible ? 'none' : '' }
    const showWhenVisible = { display: visible ? '' : 'none' }

    const toggleDetails = () => {
        setVisible(!visible)
    }
    // console.log(userName, blog.user.name)

    return (
        <div>
            <div style={hideWhenVisible}>
                {blog.title} by {blog.author}
                <button onClick={toggleDetails}>Details</button>
            </div>
            <div style={showWhenVisible} className='BlogDetails'>
                <p>Title: {blog.title} </p>
                <p>Author: {blog.author}</p>
                <p>Likes: {blog.likes}<button onClick={() => likeHandler(blog.id)}>Like it!</button></p>
                <p>User: {blog.user.name}</p>
                {userName === blog.user.name && <button onClick={() => deleteHandler(blog.id)}>Delete</button>}
                <button onClick={toggleDetails}>Close</button>
            </div>
        </div>
    )
}

export default Blog