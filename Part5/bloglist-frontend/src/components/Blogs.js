import blogService from '../services/blogs'
import Blog from './Blog'

const Blogs = ({ blogs, setBlogs, user }) => {

    const likeHandler = (id) => {

        const oldBlog = blogs.find(x => x.id === id)

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
        blogService.deleteBlog(id).then(() => {
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