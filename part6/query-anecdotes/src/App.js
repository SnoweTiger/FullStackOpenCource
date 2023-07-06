import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'

import { getAnecdotes, updateAnecdote } from './requests'
import { useQuery, useMutation, useQueryClient } from 'react-query'

const App = () => {

    const { isLoading, isError, data, error } = useQuery('anecdotes', getAnecdotes, {retry: 1})

    const queryClient = useQueryClient()
    const updateMutation = useMutation(updateAnecdote, {
        onSuccess: () => {
            queryClient.invalidateQueries('anecdotes')
        },
    })

    if ( isLoading ) {
        return <div>loading data...</div>
    }
    
    if ( isError ) {
        return <span>Error: {error.message}</span>
    }

    const anecdotes = data

    const handleVote = (anecdote) => {
        const t = anecdote
        t.votes = t.votes + 1
        updateMutation.mutate(t)
    }

    return (
        <div>
        <h3>Anecdote app</h3>
        
        <Notification />
        <AnecdoteForm />
        
        {anecdotes.map(anecdote =>
            <div key={anecdote.id}>
            <div>
                {anecdote.content}
            </div>
            <div>
                has {anecdote.votes}
                <button onClick={() => handleVote(anecdote)}>vote</button>
            </div>
            </div>
        )}
        </div>
    )
}

  

  // const anecdotes = [
  //   {
  //     "content": "If it hurts, do it more often",
  //     "id": "47145",
  //     "votes": 0
  //   },
  // ]

  // return (
  //   <div>
  //     <h3>Anecdote app</h3>
    
  //     <Notification />
  //     <AnecdoteForm />
    
  //     {anecdotes.map(anecdote =>
  //       <div key={anecdote.id}>
  //         <div>
  //           {anecdote.content}
  //         </div>
  //         <div>
  //           has {anecdote.votes}
  //           <button onClick={() => handleVote(anecdote)}>vote</button>
  //         </div>
  //       </div>
  //     )}
  //   </div>
  // )


export default App
