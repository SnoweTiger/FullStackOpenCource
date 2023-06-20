import Header from './Header'
import Content from './Content'
import Total from './Total'


const Course = ({course}) => {

    const totalExercises = course.parts.reduce((subTotal, part) => subTotal + part.exercises, 0)

    return (
      <div>
        <Header title={course.name} />
        <Content data={course.parts} />
        <Total total={totalExercises} />
      </div>   
    )

}

export default Course