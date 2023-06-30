import { useState } from "react"
import blogService from '../services/blogs'

const BlogForm = ({ blogs, setBlogs }) => {

  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  
  const addNewBlog = (event) => {
    event.preventDefault()
    // console.log(title, author, url)

    const blogObject = {
      title: title,
      author: author,
      url: url,
      likes: 0
    }

    blogService
      .createBlog(blogObject)
      .then(returnedBlog => {
        setBlogs(blogs.concat(returnedBlog))
        setTitle('')
        setAuthor('')
        setUrl('')
    })
  }
  
  return (
    <div>
      <form onSubmit={addNewBlog}>
        <div>
          title: 
          <input
            type="text"
            name="title"
            value={title}
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          author: 
          <input
            type="text"
            name="author"
            value={author}
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          url:
          <input
            type="text"
            name="url"
            value={url}
            onChange={({ target }) => setUrl(target.value)}
          />
        </div>
        <div>
          <button type="submit">save</button>
        </div>
      </form>  
    </div>
)}

export default BlogForm