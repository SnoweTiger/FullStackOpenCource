
interface TitleProps {
  title: string;
}

interface Part {
  name: string;
  exerciseCount: number;
}

interface CourseProps {
  parts: Part[]
}
  

const Header = (props: TitleProps) => {
  return (<h1>{props.title}</h1>)
}

const Content = (props: CourseProps) => {
  return (
    <>
      <p>
        {props.parts[0].name} {props.parts[0].exerciseCount}
      </p>
      <p>
        {props.parts[1].name} {props.parts[1].exerciseCount}
      </p>
      <p>
        {props.parts[2].name} {props.parts[2].exerciseCount}
      </p>
    </>  
  )
}

const Total = (props: CourseProps) => {
  return (
    <p>
      Number of exercises{" "}
      {props.parts.reduce((carry, part) => carry + part.exerciseCount, 0)}
    </p>
  )
}

const App = () => {
  const courseName = "Half Stack application development";
  const courseParts = [
    {
      name: "Fundamentals",
      exerciseCount: 10
    },
    {
      name: "Using props to pass data",
      exerciseCount: 7
    },
    {
      name: "Deeper type usage",
      exerciseCount: 14
    }
  ];

  return (
    <div>
      <Header title={courseName} />
      <Content parts={courseParts} />
      <Total parts={courseParts} />
    </div>
  );
};

export default App;