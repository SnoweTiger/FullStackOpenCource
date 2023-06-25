const listHelper = require('../utils/list_helper')

const blog_empty = []

    const blog_1entities_5likes = [
        {
          _id: '5a422aa71b54a676234d17f8',
          title: 'Go To Statement Considered Harmful',
          author: 'Edsger W. Dijkstra',
          url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
          likes: 5,
          __v: 0
        }
    ]

    const blog_3entities_12likes = [
        {
          _id: "5a422a851b54a676234d17f7",
          title: "React patterns",
          author: "Michael Chan",
          url: "https://reactpatterns.com/",
          likes: 7,
          __v: 0
        },
        {
          _id: "5a422aa71b54a676234d17f8",
          title: "Go To Statement Considered Harmful",
          author: "Edsger W. Dijkstra",
          url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
          likes: 5,
          __v: 0
        },
        {
          _id: "5a422b3a1b54a676234d17f9",
          title: "Canonical string reduction",
          author: "Edsger W. Dijkstra",
          url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
          likes: 3,
          __v: 0
        },  
    ]

test('dummy returns one', () => {
  const blogs = []

  const result = listHelper.dummy(blogs)
  expect(result).toBe(1)
})

describe('totalLikes', () => {

    test('when list of blogs is empty', () => {
        const result = listHelper.totalLikes(blog_empty)
        expect(result).toBe(0)
    })

    test('when list has only one blog with 5 likes', () => {
        const result = listHelper.totalLikes(blog_1entities_5likes)
        expect(result).toBe(5)
    })

    test('when list has many blog with 12 likes total', () => {
        const result = listHelper.totalLikes(blog_3entities_12likes)
        expect(result).toBe(15)
    })
})

describe('topBlog', () => {

    test('when list of blogs is empty', () => {
        const result = listHelper.favoriteBlog(blog_empty)
        expect(result).toBe(null)
    })

    test('when list has only one blog with 5 likes', () => {
        const result = listHelper.favoriteBlog(blog_1entities_5likes)
        expect(result).toEqual({
            title: blog_1entities_5likes[0].title,
            author: blog_1entities_5likes[0].author,
            likes: blog_1entities_5likes[0].likes
          })
    })

    test('when list has many blog with 12 likes total', () => {
        const result = listHelper.favoriteBlog(blog_3entities_12likes)
        expect(result).toEqual({
            title: blog_3entities_12likes[0].title,
            author: blog_3entities_12likes[0].author,
            likes: blog_3entities_12likes[0].likes
          })
    })
})

describe('mostBlogs', () => {
    test('when list of blogs is empty', () => {
        const result = listHelper.mostBlogs(blog_empty)
        expect(result).toBe(null)
    })

    test('when list has only one blog with 5 likes', () => {
        const result = listHelper.mostBlogs(blog_1entities_5likes)
        expect(result).toEqual({
            author: blog_1entities_5likes[0].author,
            blogs: 1
          })
    })

    test('when list has many blog with 12 likes total', () => {
        const result = listHelper.mostBlogs(blog_3entities_12likes)
        expect(result).toEqual({
            author: blog_3entities_12likes[1].author,
            blogs: 2
          })
    })

})

describe('mostLikes', () => {
    test('when list of blogs is empty', () => {
        const result = listHelper.mostLikes(blog_empty)
        expect(result).toBe(null)
    })

    test('when list has only one blog with 5 likes', () => {
        const result = listHelper.mostLikes(blog_1entities_5likes)
        expect(result).toEqual({
            author: blog_1entities_5likes[0].author,
            likes: 5
          })
    })

    test('when list has many blog with 12 likes total', () => {
        const result = listHelper.mostLikes(blog_3entities_12likes)
        expect(result).toEqual({
            author: blog_3entities_12likes[1].author,
            likes: 8
          })
    })

})