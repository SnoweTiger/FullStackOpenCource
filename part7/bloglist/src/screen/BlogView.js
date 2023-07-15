import { useParams, Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import { setNotification } from '../reducers/notificationReducer'
import { likeBlog, deleteBlog } from '../reducers/blogsReducer'
import Button from 'react-bootstrap/Button'

const BlogView = () => {
    const id = useParams().id
    const dispatch = useDispatch()
    const blogs = useSelector((state) => state.blogs)
    const blog = blogs.filter((blog) => blog.id === id)[0]
    const user = useSelector((state) => state.user)

    const likeHandler = (id) => {
        const updatedBlog = { ...blog }
        updatedBlog.likes = updatedBlog.likes + 1
        dispatch(likeBlog(id, updatedBlog))
        dispatch(setNotification('Blog liked', 1, 5))
    }

    const deleteHandler = (id) => {
        dispatch(deleteBlog(id))
        dispatch(setNotification(`Blog ${id} deleted`, 0, 5))
    }

    return (
        <div>
            <h3>{blog.title}</h3>
            <Link to={blog.url}>{blog.url}</Link>
            <p>
                {blog.likes} likes &nbsp;
                <Button
                    variant="outline-primary"
                    onClick={() => likeHandler(blog.id)}
                >
                    Like
                </Button>
            </p>
            <p>
                Added by {blog.user.name} &nbsp;
                {user.username === blog.user.username && (
                    <Button
                        variant="outline-danger"
                        onClick={() => deleteHandler(blog.id)}
                    >
                        Delete
                    </Button>
                )}
            </p>
        </div>
    )
}

export default BlogView
