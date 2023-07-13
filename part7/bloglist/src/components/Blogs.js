import { useSelector } from 'react-redux'

import Blog from './Blog'

const Blogs = ({ user }) => {
    const blogs = useSelector((state) => state.blogs)

    if (blogs.length) {
        return (
            <div className="blog-cards">
                {blogs.map((blog) => (
                    <Blog key={blog.id} blog={blog} userName={user.name} />
                ))}
            </div>
        )
    } else {
        return null
    }
}

export default Blogs
