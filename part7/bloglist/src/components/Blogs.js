import Blog from './Blog'

const Blogs = ({ blogs, setBlogs, user }) => {
    if (blogs.length) {
        return (
            <div className="blog-cards">
                {blogs.map((blog) => (
                    <Blog
                        key={blog.id}
                        blog={blog}
                        blogs={blogs}
                        setBlogs={setBlogs}
                        userName={user.name}
                    />
                ))}
            </div>
        )
    } else {
        return null
    }
}

export default Blogs
