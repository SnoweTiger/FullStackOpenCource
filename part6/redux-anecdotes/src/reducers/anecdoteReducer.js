import { createSlice } from '@reduxjs/toolkit'
import anecdoteService from '../services/anecdotes'
// import { useSelector } from 'react-redux'

const initialState = []

// const getId = () => (100000 * Math.random()).toFixed(0)

const anecdoteSlice = createSlice({
    name: 'anecdotes',
    initialState,
    reducers: {
        voteAnecdote(state, action) {
            const changedItem = action.payload
            // console.log(changedItem)
            const tmp = state.map(item =>
                item.id !== changedItem.id ? item : changedItem 
            )

            console.log(tmp)
            return tmp.sort((a,b) => b.votes - a.votes)
        },

        appendAnecdote(state, action) {
            return [ ...state, action.payload ]
        },

        setAnecdotes(state, action) {
            return action.payload
        }

    }
})

export const { voteAnecdote, setAnecdotes, appendAnecdote } = anecdoteSlice.actions

export const initializeAnecdotes = () => {
    return async dispatch => {
        const anecdotes = await anecdoteService.getAll()
        dispatch(setAnecdotes(anecdotes))
    }
}

export const createAnecdote = content => {
    return async dispatch => {
        const newNote = await anecdoteService.createNew(content)
        dispatch(appendAnecdote(newNote))
    }
}

export const addVoteFor = (id) => {
    return async dispatch => {
        const newAnecdote = await anecdoteService.addVote(id)
        console.log(newAnecdote)

        dispatch(voteAnecdote(newAnecdote))
    }
}

export default anecdoteSlice.reducer