import { useState } from 'react'

const Button = ({handleClick, text}) => (
  <button onClick={handleClick}>
    {text}
  </button>
)

const Anecdote = ({title, anecdote, votes}) => (
  <div>
    <h3>{title}</h3>
    <p>{anecdote}</p>
    <p>Has {votes} votes</p>
  </div>
)



const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]
   
  const [selected, setSelected] = useState(0)
  const [maxVoted, setMaxVoted] = useState(0)
  const [votes, setVotes] = useState({0:0, 1:0, 2:0, 3:0, 4:0, 5:0, 6:0,7:0})

  const nextHandler = () => setSelected(Math.floor(Math.random() * (anecdotes.length - 1)))

  const getMaxVoted = (newVotes) => {
    let newMaxVotedIndex = 0
    let newMaxVotedVotes = 0

    Object.keys(newVotes).forEach(key => {
      console.log(key, newVotes[key]);

      if (newVotes[key] > newMaxVotedVotes) {
        newMaxVotedIndex = key
        newMaxVotedVotes = newVotes[key]
      }

    });

    setMaxVoted(newMaxVotedIndex)
  }

  const voteHandler = () => {
    const newVotes = {...votes}
    newVotes[selected] += 1
    setVotes(newVotes)
    getMaxVoted(newVotes)
  }

  return (
    <div>
      <Anecdote title={'Anecdote of the day'} anecdote={anecdotes[selected]} votes={votes[selected]} />
      <Button text={'Vote'} handleClick={voteHandler}/>
      <Button text={'Next anecdote'} handleClick={nextHandler}/>
      <Anecdote title={'Anecdote with most votes'} anecdote={anecdotes[maxVoted]} votes={votes[maxVoted]} />
    </div>
  )
}

export default App