const Header = ({title}) => (
  <h1>{title}</h1>
)

const Part = ({part}) => {
  return(
  <li>
    {part.name} {part.exercises}
  </li>
)}

const Content = ({data}) => (
  <div>
    <ul>
      {data.map((part) => (
          <Part part={part} key={part.id}/>
        )
      )}
    </ul>
    
    
    {/* <Part part={data[1].name} exercises={data[1].exercises}/>
    <Part part={data[2].name} exercises={data[2].exercises}/> */}
  </div>
) 

// const Total = ({total}) => (
//   <p>Number of exercises {total}</p>
// )

const Course = ({course}) => {
  return (
    <div>
      <Header title={course.name} />
      <Content data={course.parts} />
    </div>   
  )
}

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

  course.parts.push(
    {
      name: 'Part X',
      exercises: 999,
      id: 999
    },
  )

  // const total = course.parts[0].exercises + course.parts[1].exercises + course.parts[2].exercises

  return <Course course={course} />
  // return (
  //   <div>
  //     <Header title={course.name}/>
  //     <Content data={course.parts}/>
  //     <Total total={total}/>
  //   </div>
  // )
}

export default App