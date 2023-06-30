import { useState } from "react"
import blogService from '../services/blogs'

const Blog = ({ blog, likeHandler, deleteHandler, userName }) => {
  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleDetails = () => {
    setVisible(!visible)
  }
  console.log(userName, blog.user.name)
  return (
    <div>
      <div style={hideWhenVisible}>
        {blog.title} - likes:{blog.likes}
        <button onClick={toggleDetails}>Details</button>
      </div>
      <div style={showWhenVisible}>
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

const Blogs = ({ blogs, setBlogs, user }) => {

  // console.log(user)

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
            let tmpBlogs = blogs.map(b => b.id === id ? returnedBlog : b)
            setBlogs(tmpBlogs.sort((a,b) => b.likes - a.likes))
        })

    
  }

  const deleteHandler = (id) => {
    // console.log(id, user.name)

    blogService.deleteBlog(id).then(returnedBlog => {
      setBlogs(blogs.filter(b => b.id !== id))
    })

  }

  return blogs.map(blog => 
    <Blog 
      key={blog.id} 
      blog={blog} 
      likeHandler={likeHandler} 
      deleteHandler={deleteHandler} 
      userName={user.name}
    />
  )
}

export default Blogs