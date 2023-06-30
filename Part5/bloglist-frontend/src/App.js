import { useState, useEffect } from 'react'

import Content from './components/Content'
import LoginForm from './components/LoginForm'

const App = () => {
  
  const [user, setUser] = useState(null)

  return (
    <div>
      <h2>blogs</h2>
        {user !== null && <Content user={user} />}
        {user === null && <LoginForm setUser={setUser} />}
    </div>
  )
}

export default App