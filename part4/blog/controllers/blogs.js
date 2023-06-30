const blogRouter = require('express').Router()
const jwt = require('jsonwebtoken')

const Blog = require('../models/blog')
const User = require('../models/user')
const { userExtractor } = require('../utils/middleware')
 

blogRouter.get('/', async (request, response) => {
    const blogs = await Blog
      .find({})  
      .populate('user', { username: 1, name: 1 })
    response.json(blogs)  
})
  
blogRouter.post('/', userExtractor, async (request, response) => {
    const body = request.body

    const blog = new Blog({
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes || 0,
        user: request.userId
    })

    const savedBlog = await blog.save()
    response.status(201).json(savedBlog)
})

blogRouter.delete('/:id', userExtractor, async (request, response, next) => {
  
  const blog = await Blog.findById(request.params.id)

  if (blog.user.toString() == request.userId) {
    await Blog.findByIdAndRemove(request.params.id)
    response.status(204).end()
  } else {
    response.status(403).end()
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