import { createSlice } from '@reduxjs/toolkit'
import blogsService from '../services/blogs'

const initialState = []

const blogsSlice = createSlice({
    name: 'blogs',
    initialState,
    reducers: {
        appendBlog(state, action) {
            return [...state, action.payload]
        },
        setBlogs(state, action) {
            return action.payload
        },
    },
})

export const { setBlogs, appendBlog } = blogsSlice.actions

export const initializeBlogs = () => {
    return async (dispatch) => {
        const blogs = await blogsService.getAll()
        dispatch(setBlogs(blogs))
    }
}

export const createNewBlog = (newBlog) => {
    return async (dispatch) => {
        const newBlogResponse = await blogsService.createBlog(newBlog)
        dispatch(appendBlog(newBlogResponse))
    }
}

export default blogsSlice.reducer
