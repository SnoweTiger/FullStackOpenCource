const blogRouter = require('express').Router()
const jwt = require('jsonwebtoken')

const Blog = require('../models/blog')
const User = require('../models/user')



blogRouter.get('/', async (request, response) => {
    const blogs = await Blog
      .find({})  
      .populate('user', { username: 1, name: 1 })
    response.json(blogs)  
})
  
blogRouter.post('/', async (request, response) => {
    const body = request.body

    const decodedToken = jwt.verify(request.token, process.env.SECRET)
    if (!decodedToken.id) {
      return response.status(401).json({ error: 'token invalid' })
    }
    const user = await User.findById(decodedToken.id)



    const blog = new Blog({
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes || 0,
        user: user.id
    })

    const savedBlog = await blog.save()
    response.status(201).json(savedBlog)
})

blogRouter.delete('/:id', async (request, response, next) => {

    const decodedToken = jwt.verify(request.token, process.env.SECRET)

    if (!decodedToken.id) {
      return response.status(401).json({ error: 'token invalid' })
    } else {
      const blog = await Blog.findById(request.params.id)

      console.log('ffff ', blog)

      if (blog.user.toString() == decodedToken.id) {
        await Blog.findByIdAndRemove(request.params.id)
        response.status(204).end()
      } else {
        response.status(403).end()
      }
    }
})

blogRouter.put('/:id',  (request, response, next) => {
    const body = request.body
  
    const blog = {
      title: body.title,
      author: body.author,
      url: body.url,
      likes: body.likes,
    }

    Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
    .then(updatedNote => {
      response.json(updatedNote)
    })
    .catch(error => next(error))

    // const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
    // response.status(200).json(updatedBlog)
  
})

module.exports = blogRouter