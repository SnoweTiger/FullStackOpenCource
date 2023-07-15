import { useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import BlogForm from '../components/BlogForm'
import Togglable from '../components/Togglable'
import Blogs from '../components/Blogs'

import { setNotification } from '../reducers/notificationReducer'
import { createNewBlog } from '../reducers/blogsReducer'

const BlogsView = () => {
    const blogFormRef = useRef()
    const dispatch = useDispatch()
    const user = useSelector((state) => state.user)

    const addBlog = (blogObject) => {
        blogFormRef.current.toggleVisibility()
        dispatch(createNewBlog({ ...blogObject, user: user }))
        dispatch(setNotification('Added new anecdote', 1, 5))
    }

    return (
        <div>
            <Togglable label={'Create new blog'} ref={blogFormRef}>
                <BlogForm createBlog={addBlog} />
            </Togglable>

            <Blogs />
        </div>
    )
}

export default BlogsView
