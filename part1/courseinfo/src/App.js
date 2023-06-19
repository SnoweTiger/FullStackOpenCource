


const Hello = (props) => {
  return (
    <div>
      Hello {props.name}, you are {props.age} years old
    </div>
  )
}

const App = () => {
  const friends = [ 'Peter', 'Maya']

  return (
    <div>
      <p>{friends}</p>
    </div>
  )
}

export default App;
