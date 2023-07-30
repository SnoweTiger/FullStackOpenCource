interface CoursePartBase {
  name: string;
  exerciseCount: number;
}

interface CoursePartBasic extends CoursePartBase {
  description: string;
  kind: "basic"
}

interface CoursePartGroup extends CoursePartBase {
  groupProjectCount: number;
  kind: "group"
}

interface CoursePartBackground extends CoursePartBase {
  description: string;
  backgroundMaterial: string;
  kind: "background"
}

type CoursePart = CoursePartBasic | CoursePartGroup | CoursePartBackground;


interface TitleProps {
  title: string;
}

const Header = (props: TitleProps) => {
  return (<h1>{props.title}</h1>)
}

interface CourseProps {
  parts: CoursePart[]
}

const Content = (props: CourseProps) => {
  const parts = props.parts
  return (
    <>
      {parts.map(part => {
        console.log(part)
        return <Part part={ part} />
      })}
    </>  
  )
}


interface partProps {
  part: CoursePart
}

const Part = (props: partProps) => {
  const part = props.part
  
  switch (part.kind) {
    case "group":
      return (
        <>
          <h4>{part.name} {part.exerciseCount}</h4>
          <p>{part.groupProjectCount}s</p>
        </>
      )
    case "background":
      return (
        <>
          <h4>{part.name} {part.exerciseCount}</h4>
          <p>{part.description}</p>
          <p>{part.backgroundMaterial}</p>
        </>
      )
    default:
      return (
        <>
          <h4>{part.name} {part.exerciseCount}</h4>
          <p>{part.description}</p>
        </>
      )
  }
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

  const courseParts: CoursePart[] = [
  {
    name: "Fundamentals",
    exerciseCount: 10,
    description: "This is an awesome course part",
    kind: "basic"
  },
  {
    name: "Using props to pass data",
    exerciseCount: 7,
    groupProjectCount: 3,
    kind: "group"
  },
  {
    name: "Basics of type Narrowing",
    exerciseCount: 7,
    description: "How to go from unknown to string",
    kind: "basic"
  },
  {
    name: "Deeper type usage",
    exerciseCount: 14,
    description: "Confusing description",
    backgroundMaterial: "https://type-level-typescript.com/template-literal-types",
    kind: "background"
  },
  {
    name: "TypeScript in frontend",
    exerciseCount: 10,
    description: "a hard part",
    kind: "basic",
  },
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