import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import { setNotification } from '../reducers/notificationReducer'
import { likeBlog, deleteBlog } from '../reducers/blogsReducer'

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
            <p>{blog.url}</p>
            <p>
                {blog.likes} likes
                <button onClick={() => likeHandler(blog.id)}>Like</button>
            </p>
            <p>
                Added by {blog.user.name}
                {user.username === blog.user.username && (
                    <button onClick={() => deleteHandler(blog.id)}>
                        Delete
                    </button>
                )}
            </p>
        </div>
    )
}

export default BlogView
