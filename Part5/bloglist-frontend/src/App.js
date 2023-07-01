import { useState, useEffect } from 'react'

import blogService from './services/blogs'

import Content from './components/Content'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'

const App = () => {
    const [user, setUser] = useState(null)
    const [message, setMessage] = useState(null)

    useEffect(() => {
        const loggedUserJSON = window.localStorage.getItem('BlogUser')
        if (loggedUserJSON) {
            const user = JSON.parse(loggedUserJSON)
            setUser(user)
            blogService.setToken(user.token)
        }
    }, [])

    return (
        <div>
            <h2>blogs</h2>
            <Notification message={message}/>
            {user !== null && <Content user={user} setUser={setUser} setMessage={setMessage}/>}
            {user === null && <LoginForm setUser={setUser} setMessage={setMessage}/>}
        </div>
    )
}

export default App