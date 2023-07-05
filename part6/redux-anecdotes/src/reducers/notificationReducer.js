import { createSlice } from '@reduxjs/toolkit'



const initialState = 'null'

const notificationSlice = createSlice({
    name: 'notification',
    initialState,
    reducers: {
        riseNotification(state, action) {
            return action.payload
        },
        resetNotification(state, action) {
            return initialState
        }
    }
  })

export const { riseNotification, resetNotification } = notificationSlice.actions
export default notificationSlice.reducer