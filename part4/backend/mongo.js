const mongoose = require('mongoose')

// if (process.argv.length<3) {
//   console.log('give password as argument')
//   process.exit(1)
// }
// const password = process.argv[2]

const url =`mongodb://localhost:27017/test_notes`
//   `mongodb+srv://snowetiger:${password}@cluster0.z2gppil.mongodb.net/?retryWrites=true&w=majority`
  

mongoose.set('strictQuery',false)
mongoose.connect(url)

const noteSchema = new mongoose.Schema({
  content: String,
  important: Boolean,
})

const Note = mongoose.model('Note', noteSchema)

const note1 = new Note({
  content: 'HTML is Easy',
  important: true,
})
note1.save().then(result => {
  console.log('note saved!')
})

const note2 = new Note({
  content: '2 HTML is Easy',
  important: true,
})
note2.save().then(result => {
  console.log('note saved!')
})

const note3 = new Note({
  content: '3 HTML is Easy',
  important: true,
})
note3.save().then(result => {
  console.log('note saved!')
  mongoose.connection.close()
})

// Note.find({}).then(result => {
//   result.forEach(note => {
//     console.log(note)
//   })
  
// })


// docker run -d -p 27017:27017 --name mongo-test2 -e MONGODB_INITDB_ROOT_USERNAME=sam -e MONGODB_INITDB_ROOT_PASSWORD=sam mongo:latest