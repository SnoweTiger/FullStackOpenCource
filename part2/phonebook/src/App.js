import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ]) 

  const [newName, setNewName] = useState('')

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const addPerson = (event) => {
    event.preventDefault()
    const exist = persons.some(el => el.name === newName);
    // console.log(exist, newName, persons);
    if (exist) {
      alert(`${newName} is already added to phonebook`)
    } else {
      const newPerson = {name: newName}
      setPersons([...persons, newPerson])
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <div>debug: {newName}</div>
      <form onSubmit={addPerson}>
        <div>
          name: <input onChange={handleNameChange}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>

      <div>
        <h2>Numbers</h2>
        <ul>
          {persons.map((person, index) => 
            <li key={index}>{person.name}</li>
          )}
        </ul>
      </div>
    </div>
  )
}

export default App
