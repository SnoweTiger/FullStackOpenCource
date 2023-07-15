import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import Table from 'react-bootstrap/Table'

const Users = () => {
    const users = useSelector((state) => state.users)

    if (users && users.length) {
        return (
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <td>User</td>
                        <td>Published blogs</td>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user) => (
                        <tr key={user.id}>
                            <td>
                                <Link to={`/user/${user.id}`}>{user.name}</Link>
                            </td>
                            <td>{user.blogs.length}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        )
    } else {
        return null
    }
}

export default Users
