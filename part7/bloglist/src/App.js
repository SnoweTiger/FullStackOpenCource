import { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'

import blogService from './services/blogs'

import Content from './components/Content'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import { initializeBlogs } from './reducers/blogsReducer'

const App = () => {
    const [user, setUser] = useState(null)
    // const [message, setMessage] = useState(null)

    useEffect(() => {
        const loggedUserJSON = window.localStorage.getItem('BlogUser')
        if (loggedUserJSON) {
            const user = JSON.parse(loggedUserJSON)
            setUser(user)
            blogService.setToken(user.token)
        }
    }, [])

    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(initializeBlogs())
    }, [dispatch])

    return (
        <div>
            <h2>Blogs</h2>
            <Notification />
            {user !== null && <Content user={user} setUser={setUser} />}
            {user === null && <LoginForm setUser={setUser} />}
        </div>
    )
}

export default App
