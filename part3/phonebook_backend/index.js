require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')

const Person = require('./models/persons')



const app = express()

app.use(cors())
app.use(express.static('build'))
app.use(express.json())
morgan.token('body', (req, _) => JSON.stringify(req.body));
app.use(morgan(':method :url :status :response-time ms :body')); 

// let persons = [
//   { 
//     "id": 1,
//     "name": "Arto Hellas", 
//     "number": "040-123456"
//   },
//   { 
//     "id": 2,
//     "name": "Ada Lovelace", 
//     "number": "39-44-5323523"
//   },
//   { 
//     "id": 3,
//     "name": "Dan Abramov", 
//     "number": "12-43-234345"
//   },
//   { 
//     "id": 4,
//     "name": "Mary Poppendieck", 
//     "number": "39-23-6423122"
//   }
// ]
  
app.get('/info', (_, response) => {
  let dateTime = new Date();
  Person.find({}).then(persons => {
    const count = persons.length
    response.send(200, `<p>Phonebook has info for ${count} persons.</p><p>${dateTime}</p>`) 
  })
})

app.get('/api/persons', (_, response) => {
  
})

app.get('/api/persons/:id', (request, response) => {
  Person.findById(request.params.id).then(person => {
    if (person) {
      response.json(person)
    } else {
      response.status(404).end()
    }
  })
})

app.delete('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)

  const person = persons.find(person => person.id === id)
  if (person) {
    persons = persons.filter(person => person.id !== id)
    response.status(204).end()
  } else {
    response.status(404).end()
  }
})

app.post('/api/persons', (request, response) => {
  const body = request.body

  console.log('Add person', body)

  if (!body.name || !body.number) {
      return response.status(400).json({ 
      error: 'The name or number is missing' 
      })
  }

  // const existedPerson = persons.find(person => person.name === body.name);
  // if (existedPerson) {
  //   return response.status(400).json({ 
  //   error: 'The name already exists in the phonebook' 
  //   })
  // }

  const newPerson = new Person ({
      name: body.name,
      number: body.number,
  })

  newPerson.save().then(savedNote => {
    response.json(savedNote)
  })
})

const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})