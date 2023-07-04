const StatisticLine = ({text, score}) => (
    <tr>
      <td>{text}</td>
      <td>{ score }</td>
    </tr>
  )

const Statistics = ({title, metrics}) => {

    const all = metrics.good + metrics.ok + metrics.bad
    const average = (1 * metrics.good + 0 * metrics.ok - 1 * metrics.bad) / all
    const percent = metrics.good / all * 100

    console.log('all = ' + metrics)

    if (all > 0) {
        return (
            <div>
                <h3>{ title }</h3>

                <table>
                    <StatisticLine text={'Good'} score={metrics.good}/>
                    <StatisticLine text={'Neutral'} score={metrics.ok}/>
                    <StatisticLine text={'Bad'} score={metrics.bad}/>

                    <StatisticLine text={'All'} score={all}/>
                    <StatisticLine text={'Average'} score={average}/>
                    <StatisticLine text={'Percent'} score={percent + '%'}/> 
                </table>
            </div>
        )
    } else {
        return (
            <div>
                <h3>{ title }</h3>
                <p>No feedback given</p>
            </div>
        )
    }
}

export default Statistics
