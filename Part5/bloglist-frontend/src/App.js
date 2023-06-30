import { useState, useEffect } from 'react'

import blogService from './services/blogs'

import Content from './components/Content'
import LoginForm from './components/LoginForm'

const App = () => {
  
  const [user, setUser] = useState(null)

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
      {user !== null && <Content user={user} setUser={setUser}/>}
      {user === null && <LoginForm setUser={setUser} />}
    </div>
  )
}

export default App