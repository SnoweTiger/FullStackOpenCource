import { useState } from 'react'
import { useDispatch } from 'react-redux'

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
        <form onSubmit={handleLogin}>
            <div>
                username
                <input
                    type="text"
                    value={username}
                    name="Username"
                    onChange={({ target }) => setUsername(target.value)}
                />
            </div>
            <div>
                password
                <input
                    type="password"
                    value={password}
                    name="Password"
                    onChange={({ target }) => setPassword(target.value)}
                />
            </div>
            <button type="submit">login</button>
        </form>
    )
}

export default LoginForm
