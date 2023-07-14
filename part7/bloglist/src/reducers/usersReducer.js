import { createSlice } from '@reduxjs/toolkit'
import usersService from '../services/users'

const initialState = null

const usersSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUsers(state, action) {
            return action.payload
        },
        resetUsers() {
            return null
        },
    },
})

export const { setUsers, resetUsers } = usersSlice.actions

export const initializeUsers = () => {
    return async (dispatch) => {
        const users = await usersService.getAll()
        dispatch(setUsers(users))
    }
}

export default usersSlice.reducer
