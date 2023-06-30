import { useState } from "react"
import blogService from '../services/blogs'

const Blog = ({blog, likeHandler}) => {
  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleDetails = () => {
    setVisible(!visible)
  }

  return (
    <div>
      <div style={hideWhenVisible}>
        {blog.title}
        <button onClick={toggleDetails}>Details</button>
      </div>
      <div style={showWhenVisible}>
        <p>Title: {blog.title} </p>
        <p>Author: {blog.author}</p>
        <p>Likes: {blog.likes}<button onClick={() => likeHandler(blog.id)}>Like it!</button></p>
        <p>User: {blog.user.name}</p>
        <button onClick={toggleDetails}>Close</button>
      </div>
    </div>
  )
}

const Blogs = ({ blogs, setBlogs }) => {

  const likeHandler = (id) => {
    
    const oldBlog = blogs.find(x => x.id === id)
    console.log('id = ', oldBlog)

    const blogObject = {
      title: oldBlog.title, 
      author: oldBlog.author, 
      url: oldBlog.url, 
      likes: oldBlog.likes + 1
    }

    blogService
          .updateBlog(id, blogObject)
          .then(returnedBlog => {
            const tmpBlogs = blogs.map(b => b.id === id ? returnedBlog : b);
            setBlogs(tmpBlogs)
        })
  }

  return blogs.map(blog => <Blog key={blog.id} blog={blog} likeHandler={likeHandler}/>)
}

export default Blogs