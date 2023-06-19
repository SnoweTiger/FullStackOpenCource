const Header = ({title}) => (
  <h1>{title}</h1>
)

const Part = ({part, exercises}) => (
  <p>{part} {exercises}</p>
)

const Content = ({data}) => (
  <div>
    <Part part={data[0][0]} exercises={data[0][1]}/>
    <Part part={data[1][0]} exercises={data[1][1]}/>
    <Part part={data[2][0]} exercises={data[2][1]}/>
  </div>
) 

const Total = ({total}) => (
  <p>Number of exercises {total}</p>
)

const App = () => {
  const course = 'Half Stack application development'
  const part1 = 'Fundamentals of React'
  const exercises1 = 10
  const part2 = 'Using props to pass data'
  const exercises2 = 7
  const part3 = 'State of a component'
  const exercises3 = 14

  const data = [
    [part1, exercises1],
    [part2, exercises2],
    [part3, exercises3],
  ]

  return (
    <div>
      <Header title={course}/>
      <Content data={data}/>
      <Total total={exercises1 + exercises2 + exercises3}/>
    </div>
  )
}

export default App