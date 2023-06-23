require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')

const Person = require('./models/persons')
const persons = require('./models/persons')



const app = express()

app.use(cors())
app.use(express.static('build'))
app.use(express.json())
morgan.token('body', (req, _) => JSON.stringify(req.body));
app.use(morgan(':method :url :status :response-time ms :body')); 


  
app.get('/info', (_, response) => {
  let dateTime = new Date();
  Person.find({}).then(persons => {
    const count = persons.length
    response.send(200, `<p>Phonebook has info for ${count} persons.</p><p>${dateTime}</p>`) 
  })
})

app.get('/api/persons', (_, response) => {
  Person.find({}).then(persons => {
    response.json(persons)
  })
})

app.get('/api/persons/:id', (request, response, next) => {

  Person.findById(request.params.id)
    .then(person => {
      if (person) {
        response.json(person)
      } else {
        response.status(404).end()
      }
    })
    .catch(error => next(error))

})

app.delete('/api/persons/:id', (request, response, next) => {
  Person.findByIdAndRemove(request.params.id)
    .then(result => {
      if (result) {
        response.status(204).end()
      } else {
        response.status(404).end()
      }
    })
    .catch(error => next(error))
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

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)

const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } 

  next(error)
}

app.use(errorHandler)

const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})