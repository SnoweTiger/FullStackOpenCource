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
        updateBlog(state, action) {
            const changedItem = action.payload
            const tmp = state.map((item) =>
                item.id !== changedItem.id ? item : changedItem,
            )
            return tmp.sort((a, b) => b.votes - a.votes)
        },
        removeBlog(state, action) {
            const id = action.payload
            const tmp = state.filter((item) => item.id !== id)
            return tmp
        },
    },
})

export const { setBlogs, appendBlog, updateBlog, removeBlog } =
    blogsSlice.actions

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

export const likeBlog = (id, updatedBlog) => {
    return async (dispatch) => {
        const newBlogResponse = await blogsService.updateBlog(id, updatedBlog)
        dispatch(updateBlog(newBlogResponse))
    }
}

export const deleteBlog = (id) => {
    return async (dispatch) => {
        await blogsService.deleteBlog(id)
        dispatch(removeBlog(id))
    }
}

export default blogsSlice.reducer
