import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'

const initialState = null

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser(state, action) {
            return action.payload
        },
        resetUser() {
            return null
        },
    },
})

export const { setUser, resetUser } = userSlice.actions

export const logoutUser = (user) => {
    return async (dispatch) => {
        window.localStorage.removeItem('BlogUser')
        dispatch(resetUser(user))
    }
}

export const loginUser = (user) => {
    return async (dispatch) => {
        window.localStorage.setItem('BlogUser', JSON.stringify(user))
        blogService.setToken(user.token)
        dispatch(setUser(user))
    }
}

export const loadUser = () => {
    const loggedUserJSON = window.localStorage.getItem('BlogUser')
    if (loggedUserJSON) {
        const user = JSON.parse(loggedUserJSON)
        return async (dispatch) => {
            blogService.setToken(user.token)
            dispatch(setUser(user))
        }
    } else {
        return async (dispatch) => {
            dispatch(resetUser())
        }
    }
}

export default userSlice.reducer
