import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

const Blogs = () => {
    const blogs = useSelector((state) => state.blogs)

    if (blogs && blogs.length) {
        return (
            <div className="blog-cards">
                {blogs.map((blog) => (
                    <div key={blog.id}>
                        <Link to={`/blog/${blog.id}`}>{blog.title}</Link>
                    </div>
                ))}
            </div>
        )
    } else {
        return null
    }
}

export default Blogs
