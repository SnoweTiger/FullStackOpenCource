import { useState } from 'react'
import { useDispatch } from 'react-redux'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

import loginService from '../services/login'
import { loginUser } from '../reducers/userReducer'
import { setNotification } from '../reducers/notificationReducer'

const LoginForm = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const dispatch = useDispatch()

    const handleLogin = async (event) => {
        event.preventDefault()
        const user = { username, password }

        try {
            const userResp = await loginService.login(user)
            dispatch(loginUser(userResp))
            setUsername('')
            setPassword('')
        } catch (exception) {
            dispatch(setNotification(exception.response.data.error, 0, 5))
        }
    }

    return (
        <Form onSubmit={handleLogin} style={{ paddingBottom: 5 }}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Username</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="username"
                    value={username}
                    onChange={({ target }) => setUsername(target.value)}
                    required
                />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Password</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="password"
                    value={password}
                    onChange={({ target }) => setPassword(target.value)}
                    required
                />
            </Form.Group>
            <Button variant="outline-primary" type="submit">
                Login
            </Button>
        </Form>
    )
}

export default LoginForm
