import { useState } from 'react'

import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

const BlogForm = ({ createBlog }) => {
    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [url, setUrl] = useState('')

    const addBlog = (event) => {
        event.preventDefault()

        createBlog({
            title: title,
            author: author,
            url: url,
            likes: 0,
        })

        setTitle('')
        setAuthor('')
        setUrl('')
    }

    return (
        <Form onSubmit={addBlog} style={{ paddingBottom: 5 }}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Title</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="title"
                    value={title}
                    onChange={({ target }) => setTitle(target.value)}
                    required
                />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Author</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="author"
                    value={author}
                    onChange={({ target }) => setAuthor(target.value)}
                    required
                />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Title</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="url"
                    value={url}
                    onChange={({ target }) => setUrl(target.value)}
                    required
                />
            </Form.Group>
            <Button variant="outline-success" type="submit">
                save
            </Button>
        </Form>
    )
}

export default BlogForm
