// import blogService from '../services/blogs'
import Blog from './Blog'

const Blogs = ({ blogs, setBlogs, user }) => { //setBlogs

    console.log('len = ', blogs.length)

    if (blogs.length) {
        return (blogs.map(blog =>
            <Blog
                key={blog.id}
                blog={blog}
                blogs={blogs}
                setBlogs={setBlogs}
                userName={user.name}
            />
        ))
    } else {
        return null
    }
}

export default Blogs