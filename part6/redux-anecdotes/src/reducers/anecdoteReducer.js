import { createSlice } from '@reduxjs/toolkit'
import anecdoteService from '../services/anecdotes'

const initialState = []

const getId = () => (100000 * Math.random()).toFixed(0)

const anecdoteSlice = createSlice({
    name: 'anecdotes',
    initialState,
    reducers: {
        createAnecdote(state, action) {
            const text = action.payload
            const newAnecdote = {
                content: text,
                id: getId(),
                votes: 0
            }
            return [...state, newAnecdote]
        },

        voteForAnecdote(state, action) {
            const id = action.payload
            const itemToChange = state.find(n => n.id === id)
            const changedItem = { 
                ...itemToChange, 
                votes: itemToChange.votes + 1
            }

            const tmp = state.map(item =>
                item.id !== id ? item : changedItem 
            )
            return tmp.sort((a,b) => b.votes - a.votes)
        },

        setAnecdotes(state, action) {
            return action.payload
        }

    }
})

export const { createAnecdote, voteForAnecdote, setAnecdotes } = anecdoteSlice.actions

export const initializeAnecdotes = () => {
    return async dispatch => {
        const anecdotes = await anecdoteService.getAll()
        dispatch(setAnecdotes(anecdotes))
    }
}

export default anecdoteSlice.reducer