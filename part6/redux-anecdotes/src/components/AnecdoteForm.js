import { useDispatch } from "react-redux"
import { createAnecdote } from "../reducers/anecdoteReducer"
import { riseNotification, resetNotification } from "../reducers/notificationReducer"


const AnecdoteForm = () => {

    const dispatch = useDispatch()

    const addAnecdote = (event) => {
        event.preventDefault()
        const content = event.target.anecdote.value
        event.target.anecdote.value = ''
        dispatch(createAnecdote(content))
        dispatch(riseNotification('Added new anecdote'))
        setTimeout(() => {
            dispatch(resetNotification())
        }, 5000)
    }

    return (
        <>
            <h2>create new</h2>
            <form onSubmit={addAnecdote}>
            <div><input name="anecdote" /></div>
            <button>create</button>
            </form>
        </> 
    )
}

export default AnecdoteForm