import { useState } from 'react'


const Button = ({handleClick, text}) => (
  <button onClick={handleClick}>
    {text}
  </button>
)

const Statistics = ({title, metrics}) => {

  const all = metrics.good + metrics.neutral + metrics.bad
  const average = (1 * metrics.good + 0 * metrics.neutral - 1 * metrics.bad) / all
  const percent = metrics.good / all * 100

  return (
    <div>
      <h3>{ title }</h3>

      <p>Good { metrics.good }</p>
      <p>Neutral { metrics.neutral }</p>
      <p>Bad { metrics.bad }</p>

      <p>All { all }</p>
      <p>Average { average }</p>
      <p>Percent { percent }%</p>

    </div>
  )
}



const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  // const [all, setAll] = useState(0)
  // const [average, setAverage] = useState(0)
  // const [percent, setPercent] = useState(0)



  const title = 'Give feedback'
  const stat_title = 'Statistics'

  const goodFeedbackHandler = () => {
    setGood(good + 1)
  }

  const neutralFeedbackHandler = () => {
    setNeutral(neutral + 1)
  }

  const badFeedbackHandler = () => {
    setBad(bad + 1)
  }

  const statistic_metrics = {
    good: good,
    neutral: neutral,
    bad: bad,
    // all: all,
    // average: average,
    // percent: percent
  }


  return (
    <div>
      <h2>{ title }</h2>
      <Button text={'good'} handleClick={goodFeedbackHandler}/>
      <Button text={'neutral'} handleClick={neutralFeedbackHandler}/>
      <Button text={'bad'} handleClick={badFeedbackHandler}/>

      <Statistics title={stat_title} metrics={statistic_metrics}/>
    </div>

  )
}

export default App