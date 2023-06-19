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

  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }

  const total = course.parts[0].exercises + course.parts[1].exercises + course.parts[2].exercises

  return (
    <div>
      <Header title={course.name}/>
      <Content data={course.parts}/>
      <Total total={total}/>
    </div>
  )
}

export default App