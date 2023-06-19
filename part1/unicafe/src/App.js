import { useState } from 'react'


const Button = ({handleClick, text}) => (
  <button onClick={handleClick}>
    {text}
  </button>
)

const Statistics = ({title, good, neutral, bad}) => (
  <div>
    <h3>{ title }</h3>
    <p>Good { good }</p>
    <p>Neutral { neutral }</p>
    <p>Bad { bad }</p>
  </div>
)



const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const title = 'Give feedback'
  const stat_title = 'Statistics'

  const goodFeedbackHandler = () => setGood(good + 1)

  const neutralFeedbackHandler = () => setNeutral(neutral + 1)

  const badFeedbackHandler = () => setBad(bad + 1)


  return (
    <div>
      <h2>{ title }</h2>
      <Button text={'good'} handleClick={goodFeedbackHandler}/>
      <Button text={'neutral'} handleClick={neutralFeedbackHandler}/>
      <Button text={'bad'} handleClick={badFeedbackHandler}/>

      <Statistics
        title={stat_title}
        good={good}
        neutral={neutral}
        bad={bad}
      />
    </div>

  )
}

export default App