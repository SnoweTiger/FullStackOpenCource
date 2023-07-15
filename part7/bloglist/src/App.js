import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import User from './components/User'

import UsersView from './screen/UsersView'
import UserView from './screen/UserView'
import BlogsView from './screen/BlogsView'
import BlogView from './screen/BlogView'

import { loadUser } from './reducers/userReducer'
import { initializeBlogs } from './reducers/blogsReducer'
import { initializeUsers } from './reducers/usersReducer'

const App = () => {
    useEffect(() => {
        dispatch(loadUser())
    }, [])
    const user = useSelector((state) => state.user)

    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(initializeBlogs())
    }, [dispatch])

    const dispatch2 = useDispatch()
    useEffect(() => {
        dispatch2(initializeUsers())
    }, [dispatch2])

    return (
        <BrowserRouter>
            <h2>Blogs</h2>
            <Notification />
            {user !== null && (
                <div>
                    <User />
                    <Routes>
                        <Route path="/" element={<BlogsView />} />
                        <Route path="/blog/:id" element={<BlogView />} />
                        <Route path="/users" element={<UsersView />} />
                        <Route path="/user/:id" element={<UserView />} />
                    </Routes>
                </div>
            )}
            {user === null && <LoginForm />}
        </BrowserRouter>
    )
}

export default App
