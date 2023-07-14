import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

const Users = () => {
    const users = useSelector((state) => state.users)

    if (users && users.length) {
        return (
            <div className="blog-cards">
                <ul>
                    {users.map((user) => (
                        <li key={user.id}>
                            <Link to={`/user/${user.id}`}>
                                {user.name} - blogs {user.blogs.length}
                            </Link>
                        </li>
                    ))}
                </ul>
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
