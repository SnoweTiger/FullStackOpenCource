import { useState } from "react"

const Blog = ({blog}) => {
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
       <p>Likes: {blog.likes}</p>
      <button onClick={toggleDetails}>Close</button>
    </div>
  </div>

  )



    // { detailVisible ? 
    //   <div>
    //     {blog.title} 
    //     <button onClick={toggleDetails}>Details</button>
    //   </div> : <div>
    //   {blog.title} 
    //   {blog.author}
    //   {blog.likes}
    //   <button onClick={toggleDetails}>Close</button>
    // </div> 
  // }
}

const Blogs = ({ blogs }) => {
    return blogs.map(blog => <Blog key={blog.id} blog={blog} />)
}

export default Blogs