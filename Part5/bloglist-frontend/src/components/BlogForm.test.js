import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import BlogForm from './BlogForm'

describe('Test BlogForm component', () => {
    test('check data at creating new blog ', async () => {
        const user = userEvent.setup()
        const mockCreateBlog = jest.fn()

        const { container } = render(
            <BlogForm createBlog={mockCreateBlog} />
        )

        const inputTitle = container.querySelector('input[name="title"]')
        const inputAuthor = container.querySelector('input[name="author"]')
        const inputUrl = container.querySelector('input[name="url"]')
        const sendButton = screen.getByText('save')

        await user.type(inputTitle, 'testing a title')
        await user.type(inputAuthor, 'testing a author')
        await user.type(inputUrl, 'testing a url')
        await user.click(sendButton)


        expect(mockCreateBlog.mock.calls).toHaveLength(1)
        expect(mockCreateBlog.mock.calls[0][0].title).toBe('testing a title')
        expect(mockCreateBlog.mock.calls[0][0].author).toBe('testing a author')
        expect(mockCreateBlog.mock.calls[0][0].url).toBe('testing a url')
    })
})