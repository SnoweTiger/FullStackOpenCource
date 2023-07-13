// import { useState, useEffect, useRef } from 'react'
import { useRef } from 'react'
import { useDispatch } from 'react-redux'

// import blogService from '../services/blogs'
import BlogForm from './BlogForm'
import User from './User'
import Blogs from './Blogs'
import Togglable from './Togglable'
import { setNotification } from '../reducers/notificationReducer'
import { createNewBlog } from '../reducers/blogsReducer'

const Content = ({ user, setUser }) => {
    const blogFormRef = useRef()
    const dispatch = useDispatch()

    const addBlog = (blogObject) => {
        blogFormRef.current.toggleVisibility()
        dispatch(createNewBlog({ ...blogObject, user: user }))
        dispatch(setNotification('Added new anecdote', 1, 5))
    }

    return (
        <div>
            <User user={user} setUser={setUser} />

            <Togglable label={'Create new blog'} ref={blogFormRef}>
                <BlogForm createBlog={addBlog} />
            </Togglable>

            <Blogs user={user} />
        </div>
    )
}

export default Content
