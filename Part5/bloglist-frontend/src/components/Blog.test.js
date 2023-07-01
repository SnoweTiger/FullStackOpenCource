import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import Blog from './Blog'


describe('Test Blog component', () => {

    let container

    beforeEach(() => {

        const userName = 'Test User'
        const blog = {
            id: '',
            title: 'Test Title',
            author: 'Test Author',
            url: 'test_url',
            likes: 333,
            user: { name: userName }
        }

        const mockLikeHandler = jest.fn()
        const mockDeleteHandler = jest.fn()

        container = render(
            <Blog
                key={blog.id}
                blog={blog}
                likeHandler={mockLikeHandler}
                deleteHandler={mockDeleteHandler}
                userName={userName}
            />
        ).container
    })

    test('title  and author are shown by default', () => {
        const titleElement = screen.findByText('Test Title')
        expect(titleElement).toBeDefined()

        const authorElement = screen.findByText('Test Author')
        expect(authorElement).toBeDefined()
    })

    test('URL and likes are hidden by default', () => {
        const div = container.querySelector('.BlogDetails')
        expect(div).toHaveStyle('display: none')
    })
})

// test('renders blog', () => {

    

//     render(
        
//     )

//     screen.debug()



//     const authorElement = screen.findByText('Test Author')
//     expect(authorElement).toBeDefined()

//     const urlElement = screen.findByText('test_url').closest("div")
//     expect(urlElement).toHaveStyle('display: none')
//     //.not.toBeDefined()

//     const likesElement = screen.findByText(333)
//     expect(likesElement.closest("div")).toHaveStyle('display: none')
//     //.not.toBeDefined()

// })