import Course from "./components/Course"



// const Total = ({total}) => (
//   <p>Number of exercises {total}</p>
// )



const App = () => {

  const course = {
    id: 1,
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
        id: 1
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
        id: 2
      },
      {
        name: 'State of a component',
        exercises: 14,
        id: 3
      },
    ]
  }

  // Test course change 
  course.parts.push(
    {
      name: 'Part X',
      exercises: 999,
      id: 999
    },
  )

  // const total = course.parts[0].exercises + course.parts[1].exercises + course.parts[2].exercises

  return <Course course={course} />
}

export default App