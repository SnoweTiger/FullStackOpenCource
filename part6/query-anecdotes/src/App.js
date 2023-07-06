import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'

import { useQuery } from 'react-query'
import { getAnecdotes } from './requests'


const App = () => {

    const { isLoading, isError, data, error } = useQuery('anecdotes', getAnecdotes, {retry: 1})
    console.log(isLoading, isError, data, error)

    if ( isLoading ) {
        return <div>loading data...</div>
    }
    
    if ( isError ) {
        return <span>Error: {error.message}</span>
    }

    const anecdotes = data

    const handleVote = (anecdote) => {
        console.log('vote')
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
