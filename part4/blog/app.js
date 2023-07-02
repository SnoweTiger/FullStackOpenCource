const mongoose = require('mongoose')
const cors = require('cors')
const express = require('express')
require('express-async-errors')

const config = require('./utils/config')
const middleware = require('./utils/middleware')
const logger = require('./utils/logger')

const blogRouter = require('./controllers/blogs')
const userRouter = require('./controllers/user')
const loginRouter = require('./controllers/login')


logger.info('connecting to', config.MONGODB_URI)

mongoose.connect(config.MONGODB_URI)
    .then(() => {
        console.log('connected to MongoDB')
    })
    .catch((error) => {
        console.log('error connecting to MongoDB:', error.message)
    })

const app = express()
app.use(cors())
//TODO: use build
app.use(express.json())
app.use(middleware.requestLogger)
app.use(middleware.tokenExtractor)
// app.use(middleware.userExtractor)

app.use('/api/login', loginRouter)
app.use('/api/users', userRouter)
app.use('/api/blogs', blogRouter)

if (process.env.NODE_ENV === 'test') {
    const testingRouter = require('./controllers/testing')
    app.use('/api/testing', testingRouter)
}  

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app