import { useState } from 'react'
import Search from './components/Search'
import Form from './components/Form'
import Numbers from './components/Numbers'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])

  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchString, setSearchString] = useState('')

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleSearchChange = (event) => {
    setSearchString(event.target.value)
  }

  const addPerson = (event) => {
    event.preventDefault()
    const exist = persons.some(el => el.name === newName);
    if (exist) {
      alert(`${newName} is already added to phonebook`)
    } else {
      const newPerson = {
        name: newName,
        number: newNumber
      }
      setPersons([...persons, newPerson])
    }
  }

  const searchStrLower = searchString.toLowerCase();
  const personsToShow = searchString
    ? persons.filter(person => person.name.toLowerCase().includes(searchStrLower))
    : persons



  return (
    <div>
      <h2>Phonebook</h2>

      <Search handler={handleSearchChange} />

      <h3>Add new</h3>
      <Form 
        addPerson={addPerson} 
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
      />

      <h3>Numbers</h3>
      <Numbers persons={personsToShow}/>

    </div>
  )
}

export default App
