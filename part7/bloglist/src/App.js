import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import Content from './components/Content'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'

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
        <div>
            <h2>Blogs</h2>
            <Notification />
            {user !== null && <Content user={user} />}
            {user === null && <LoginForm />}
        </div>
    )
}

export default App
