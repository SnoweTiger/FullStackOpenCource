const userRouter = require('express').Router()
const bcrypt = require('bcrypt')
const User = require('../models/user')

userRouter.get('/', async (request, response) => {
    const users = await User.find({})  
    response.json(users)  
})

userRouter.post('/', async (request, response) => {
    const {username, name, password} = request.body

    if (password.length < 3) {
        response.status(400).json({
            error: 'Password validation failed: password: password is shorter than the minimum allowed length (3).'
        })
    }

    const saltRounds = 9
    const passwordHash = await bcrypt.hash(password, saltRounds)

    const user = new User({username, name, passwordHash})

    const savedUser = await user.save()

    response.status(201).json(savedUser)
})

module.exports = userRouter