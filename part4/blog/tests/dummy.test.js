const listHelper = require('../utils/list_helper')

test('dummy returns one', () => {
  const blogs = []

  const result = listHelper.dummy(blogs)
  expect(result).toBe(1)
})

describe('totalLikes', () => {

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
          likes: 0,
          __v: 0
        },  
    ]
    
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
        expect(result).toBe(12)
    })
})