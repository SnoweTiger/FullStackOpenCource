import { useState } from 'react'

import Statistics from './components/Statistics'



const Button = ({handleClick, text}) => (
  <button onClick={handleClick}>
    {text}
  </button>
)

const App = ({ store }) => {

  const title = 'Give feedback'
  const stat_title = 'Statistics'

  const goodFeedbackHandler = () => {
    store.dispatch({ type: 'GOOD' })
  }

  const neutralFeedbackHandler = () => {
    store.dispatch({ type: 'OK' })
  }

  const badFeedbackHandler = () => {
    store.dispatch({ type: 'BAD' })
  }

  const resetHandler = () => {
    store.dispatch({ type: 'ZERO' })
  }

  return (
    <div>
      <h2>{ title }</h2>

      <Button text={'good'} handleClick={goodFeedbackHandler}/>
      <Button text={'neutral'} handleClick={neutralFeedbackHandler}/>
      <Button text={'bad'} handleClick={badFeedbackHandler}/>
      <Button text={'reset'} handleClick={resetHandler}/>

      <Statistics title={stat_title} metrics={store.getState()}/>
    </div>

  )
}

export default App