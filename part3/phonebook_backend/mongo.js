const mongoose = require('mongoose')

console.log(process.argv)
console.log('')

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

if (process.argv.length == 5) {

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


    


// const password = process.argv[2]
// const username = 'username'
// // Get username and pass from .env
// const username = process.env.USER_NAME
// const password = process.env.USER_PASSWORD
// console.log(`Credential: ${username}:${password}`)
// // Write test data
// const newPersons = [
//     ,
//     new Person({name: 'Mike', number: '321-123-123'}),
//     new Person({name: 'Kate', number: '456-123-123'}),
// ]
// newPersons[1].save().then(result => {
//     console.log('person saved!')
// })
// newPersons[2].save().then(result => {
//     console.log('person saved!')
// })