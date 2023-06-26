const mongoose = require('mongoose')
const supertest = require('supertest')

const app = require('../app')
const api = supertest(app)

const Blog = require('../models/blog')

const { initialBlogs, blogInDb } = require('./test_helper')


beforeEach(async () => {
    await Blog.deleteMany({})
  
    const blogObjects = initialBlogs.map(blog => new Blog(blog))
    const promiseArray = blogObjects.map(blog => blog.save())
    await Promise.all(promiseArray)
})
  
test('notes are returned as json', async () => {
    const response = await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)

    expect(response.body).toHaveLength(initialBlogs.length)
})

test('unique identifier property of the blog posts is named id', async () => {
    const response = await api.get('/api/blogs')
    // console.log(response.body)
    expect(response.body[0].id).toBeDefined()
})

test('a valid blog can be added', async () => {
    const newBlog = {
        title: "Test title",
        author: "Test author",
        url: "test url",
        likes: 333,
    }
  
    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)
  
    const blogsAtEnd = await blogInDb()
    expect(blogsAtEnd).toHaveLength(initialBlogs.length + 1)
  
    expect(blogsAtEnd.map(n => n.title)).toContain('Test title')
    expect(blogsAtEnd.map(n => n.author)).toContain('Test author')
    expect(blogsAtEnd.map(n => n.url)).toContain('test url')
})

test('check if like is undefined', async () => {
    const newBlog = {
        title: "Test title",
        author: "Test author",
        url: "test url"
    }
  
    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)
  
    const blogsAtEnd = await blogInDb()
    console.log(blogsAtEnd)
    expect(blogsAtEnd.map(n => n.likes)).toContain(0)
})


afterAll(async () => {
    await mongoose.connection.close()
})