import { useMutation, useQueryClient } from 'react-query'
import { createAnecdote } from '../requests'



const AnecdoteForm = ({dispatch}) => {
    const queryClient = useQueryClient()

    const newNoteMutation = useMutation(createAnecdote, {
        onSuccess: () => {
          queryClient.invalidateQueries('anecdotes')
        },
        onError: (err) => {
            dispatch({
                type: 'RISE',
                message: `Code: ${err.response.status} Error: ${err.response.data.error}`
            })
            setTimeout(() => {
                dispatch({
                    type: 'RESET',
                    message: ''
                })
            }, 5000)
        }
    })

    const onCreate = (event) => {
        event.preventDefault()
        const content = event.target.anecdote.value
        event.target.anecdote.value = ''
        newNoteMutation.mutate({ content, votes: 0 })

        dispatch({
            type: 'RISE',
            message: `Add anecdote`
        })
        setTimeout(() => {
            dispatch({
                type: 'RESET',
                message: ''
            })
        }, 3000)
    }

    return (
        <div>
            <h3>create new</h3>
            <form onSubmit={onCreate}>
                <input name='anecdote' />
                <button type="submit">create</button>
            </form>
        </div>
    )
}

export default AnecdoteForm
