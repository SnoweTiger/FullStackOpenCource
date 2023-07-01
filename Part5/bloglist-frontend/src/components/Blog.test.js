import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'


describe('Test Blog component', () => {

    let container
    const mockLikeHandler = jest.fn()
    const mockDeleteHandler = jest.fn()
    const userName = 'Test User'
    const blog = {
        id: '',
        title: 'Test Title',
        author: 'Test Author',
        url: 'test_url',
        likes: 333,
        user: { name: userName }
    }

    beforeEach(() => {

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

    test('url and likes shown after click Details button', async () => {
        const user = userEvent.setup()
        const button = screen.getByText('Details')
        await user.click(button)

        const div = container.querySelector('.BlogDetails')
        expect(div).not.toHaveStyle('display: none')
    })

    test('check 2 clicks on likes button', async () => {
        const user = userEvent.setup()
        const button = screen.getByText('Details')
        await user.click(button)

        const likesButton = screen.getByText('Like it!')
        await userEvent.click(likesButton)
        await userEvent.click(likesButton)

        expect(mockLikeHandler.mock.calls).toHaveLength(2)
    })
})
