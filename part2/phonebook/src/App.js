import { useState, useEffect } from 'react'
import axios from 'axios'

import Search from './components/Search'
import Form from './components/Form'
import Numbers from './components/Numbers'

import personsService from './services/persons'

const App = () => {

  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchString, setSearchString] = useState('')

  useEffect(() => {
    personsService
      .getAllPersons()
      .then(loadedPersons => setPersons(loadedPersons))
  }, [])

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleSearchChange = (event) => {
    setSearchString(event.target.value)
  }

  const handleDelPerson = (id) => {
    if (window.confirm(`Do you really want person with id ${id}?`)) {
      personsService.delPerson(id).then(() => {
        const newPersons = persons.filter(person => person.id !== id)
        setPersons(newPersons)
      })
    }
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

      personsService.addNewPerson(newPerson)
        .then(responseData => setPersons([...persons, responseData]))
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
      <Numbers 
        persons={personsToShow} 
        delHandler={handleDelPerson}
      />

    </div>
  )
}

export default App
