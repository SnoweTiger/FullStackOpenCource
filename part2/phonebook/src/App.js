import { useState, useEffect } from 'react'
import axios from 'axios'

import Search from './components/Search'
import Form from './components/Form'
import Numbers from './components/Numbers'

const App = () => {

  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchString, setSearchString] = useState('')

  const hook = () => {
    axios
      .get('http://localhost:3001/persons')
      .then((response) => {
        setPersons(response.data)
      })
  }

  useEffect(hook, [])

  

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
      
      axios
        .post('http://localhost:3001/persons', newPerson).then(response => {
          setPersons([...persons, response.data])
      })
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
