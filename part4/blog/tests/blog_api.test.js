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

test('check code 400 if no title or url', async () => {
    const newBlog = {
        author: "Test author",
        url: "test url",
        likes: 0
    }
  
    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(400)

    const newBlog2 = {
        title: "Test title",
        author: "Test author",
        likes: 0
    }
  
    await api
      .post('/api/blogs')
      .send(newBlog2)
      .expect(400)
})

describe('deletion of a blog', () => {

    test('existed blog can be delete', async () => {
        const blogAtStart = await blogInDb()
        const blogToDelete = blogAtStart[0]
      
        await api
          .delete(`/api/blogs/${blogToDelete.id}`)
          .expect(204)
      
        const blogsAtEnd = await blogInDb()
      
        expect(blogsAtEnd).toHaveLength(
          initialBlogs.length - 1
        )
      
        const titles = blogsAtEnd.map(r => r.title)
        expect(titles).not.toContain(blogToDelete.title)
    })
})

describe('update of a blog', () => {

    test('update blog can be delete', async () => {
        const blogAtStart = await blogInDb()
        const blogToUpdate = blogAtStart[0]
        blogToUpdate.title = 'Test title'

        await api
            .put(`/api/blogs/${blogToUpdate.id}`)
            .send(blogToUpdate)
            .expect(200)
            .expect('Content-Type', /application\/json/)
  
        const blogsAtEnd = await blogInDb()
        expect(blogsAtEnd.map(n => n.title)).toContain('Test title')

    })
})




afterAll(async () => {
    await mongoose.connection.close()
})