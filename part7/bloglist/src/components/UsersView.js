import { useState, useEffect } from 'react'
import usersService from '../services/users'

const Users = () => {
    const [users, setUsers] = useState([])

    useEffect(async () => {
        const newUsers = await usersService.getAll()
        setUsers(newUsers)
    }, [])

    if (users.length) {
        return (
            <div className="blog-cards">
                {users.map((user) => (
                    <p key={user.id}>
                        {user.username} - {user.name}
                    </p>
                ))}
            </div>
        )
    } else {
        return null
    }
}

const UsersView = () => {
    return (
        <div>
            <h3>Users</h3>
            <Users />
        </div>
    )
}

export default UsersView
