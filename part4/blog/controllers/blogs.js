const blogRouter = require('express').Router()
const Blog = require('../models/blog')



blogRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({})  
    response.json(blogs)  
})
  
blogRouter.post('/', async (request, response) => {
    const body = request.body

    const blog = new Blog({
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes || 0
    })

    const savedBlog = await blog.save()
    response.status(201).json(savedBlog)
})

blogRouter.delete('/:id', async (request, response, next) => {
    await Blog.findByIdAndRemove(request.params.id)
    response.status(204).end()
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