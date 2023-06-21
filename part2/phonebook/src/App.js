import { useState, useEffect } from 'react'

import Search from './components/Search'
import Form from './components/Form'
import Numbers from './components/Numbers'
import Notification from './components/Notification'
import personsService from './services/persons'

const App = () => {

  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchString, setSearchString] = useState('')
  
  const [message, setMessage] = useState(null)

  

  useEffect(() => {

    // setMessage({text:'Hi!', type:0})

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

    const newPerson = {
      name: newName,
      number: newNumber,
    }

    const person = persons.find(person => person.name === newName);
    if (person) {
      if (window.confirm(`${newName} is already in the phonebook, replace the old number?`)) {        
        // console.log('old person data ', person)

        personsService.updatePerson(person.id, newPerson)
          .then(responseData => {
            setMessage({text:`The number of ${responseData.name} was changed`, type:1})
            setTimeout(() => {setMessage(null)}, 2000)
            const newPersons = persons.map(p => p.name === newName ? responseData : p )
            setPersons([...newPersons])
          })
      }
    } else {
      personsService.addNewPerson(newPerson)
        .then(responseData => {
          setMessage({text:`Added ${responseData.name}`, type:1})
          setTimeout(() => {setMessage(null)}, 2000)
          setPersons([...persons, responseData])
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
      <Notification message={message} />

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
