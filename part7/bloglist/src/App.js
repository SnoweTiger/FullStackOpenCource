import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Content from './components/Content'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import UsersView from './components/UsersView'
import User from './components/User'

import { initializeBlogs } from './reducers/blogsReducer'
import { loadUser } from './reducers/userReducer'

const App = () => {
    const user = useSelector((state) => state.user)
    useEffect(() => {
        dispatch(loadUser(user))
    }, [])

    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(initializeBlogs())
    }, [dispatch])

    return (
        <BrowserRouter>
            <h2>Blogs</h2>
            <Notification />
            {user !== null && (
                <>
                    <User />
                    <Routes>
                        <Route path="/" element={<Content />} />
                        <Route path="/users" element={<UsersView />} />
                    </Routes>
                </>
            )}
            {user === null && <LoginForm />}
        </BrowserRouter>
    )
}

export default App
