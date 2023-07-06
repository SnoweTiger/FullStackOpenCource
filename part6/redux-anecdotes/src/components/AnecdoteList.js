import { useSelector, useDispatch } from 'react-redux'
import { addVoteFor } from '../reducers/anecdoteReducer'
import { setNotification } from "../reducers/notificationReducer"

const AnecdoteList = () => {
    const dispatch = useDispatch()
    
    const anecdotes = useSelector(state => {
        const search = state.filter
        console.log('search = ', search, typeof(search), search.length === 0)
        if ( search.length === 0) {
            return state.anecdotes
        }
        const filtered = state.anecdotes.filter(str => str.content.toLowerCase().includes(search))
        return filtered.sort((a,b) => b.votes - a.votes)
    })

    const vote = (id) => {
        dispatch(addVoteFor(id))
        dispatch(setNotification(`you voted '${id}'`, 5))
    }

    return(
        <>
            {anecdotes.map(anecdote =>
                <div key={anecdote.id}>
                <div>
                    {anecdote.content}
                </div>
                <div>
                    has {anecdote.votes}
                    <button onClick={() => vote(anecdote.id)}>vote</button>
                </div>
                </div>
            )}
        </>
    )
}

export default AnecdoteList