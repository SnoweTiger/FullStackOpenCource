const Header = ({title}) => (
  <h1>{title}</h1>
)

const Part = ({part, exercises}) => (
  <p>{part} {exercises}</p>
)

const Content = ({data}) => (
  <div>
    <Part part={data[0].name} exercises={data[0].exercises}/>
    <Part part={data[1].name} exercises={data[1].exercises}/>
    <Part part={data[2].name} exercises={data[2].exercises}/>
  </div>
) 

const Total = ({total}) => (
  <p>Number of exercises {total}</p>
)

const App = () => {
  const course = 'Half Stack application development'
  const part1 = {
    name: 'Fundamentals of React',
    exercises: 10
  }
  const part2 = {
    name: 'Using props to pass data',
    exercises: 7
  }
  const part3 = {
    name: 'State of a component',
    exercises: 14
  }

  const data = [part1, part2, part3]

  return (
    <div>
      <Header title={course}/>
      <Content data={data}/>
      <Total total={part1.exercises + part2.exercises + part3.exercises}/>
    </div>
  )
}

export default App