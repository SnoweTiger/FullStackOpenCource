import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    type: 0,
    text: null,
}

const notificationSlice = createSlice({
    name: 'notification',
    initialState,
    reducers: {
        riseNotification(state, action) {
            return {
                type: action.payload.type,
                text: action.payload.text,
            }
        },
        resetNotification() {
            return initialState
        },
    },
})

export const { riseNotification, resetNotification } = notificationSlice.actions

export const setNotification = (text, type, tout) => {
    return async (dispatch) => {
        const delay = tout * 1000
        dispatch(
            riseNotification({
                type: type,
                text: text,
            }),
        )
        setTimeout(() => {
            dispatch(resetNotification())
        }, delay)
    }
}

export default notificationSlice.reducer
