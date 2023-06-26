const config = require('./utils/config')
const express = require('express')
require('express-async-errors')

const cors = require('cors')
const mongoose = require('mongoose')

const blogRouter = require('./controllers/blogs')



mongoose.connect(config.MONGODB_URI)
    .then(() => {
        console.log('connected to MongoDB')
    })
    .catch((error) => {
        console.log('error connecting to MongoDB:', error.message)
    })

const app = express()
app.use(cors())
app.use(express.json())
app.use('/api/blogs', blogRouter)

module.exports = app