const mongoose = require('mongoose')

// console.log(process.argv)
// console.log('')

if (process.argv.length < 3) {
  console.log('give password as argument')
  process.exit(1)
}

const username = process.argv[0]
const password = process.argv[1]

// const url = `mongodb://localhost:27017/phone_book`
const url = `mongodb+srv://${username}:${password}@cluster0.z2gppil.mongodb.net/?retryWrites=true&w=majority`
mongoose.set('strictQuery',false)
mongoose.connect(url)

const personSchema = new mongoose.Schema({
  name: String,
  number: String
})
const Person = mongoose.model('Person', personSchema)

if (process.argv.length === 5) {

  const newPersons = new Person({
    name: process.argv[3],
    number: process.argv[4]
  })

  newPersons.save().then(_ => {
    console.log('person saved!')
    mongoose.connection.close()
  })

} else {

  Person.find({}).then(result => {
    result.forEach(person => {
      console.log(person)
    })
    mongoose.connection.close()
  })
}