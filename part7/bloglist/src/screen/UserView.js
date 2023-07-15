import { useParams, Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import Table from 'react-bootstrap/Table'

const UserBlogs = ({ userId }) => {
    const blogs = useSelector((state) => state.blogs)
    const filteredBlogs = blogs.filter((blog) => blog.user.id === userId)

    if (!filteredBlogs) {
        return null
    }

    return (
        <Table striped bordered hover>
            <thead>
                <tr>
                    <td>Blog</td>
                    <td>Likes</td>
                </tr>
            </thead>
            <tbody>
                {filteredBlogs.map((blog) => (
                    <tr key={blog.id}>
                        <td>
                            <Link to={`/blog/${blog.id}`}>{blog.title}</Link>
                        </td>
                        <td>{blog.likes}</td>
                    </tr>
                ))}
            </tbody>
        </Table>
    )
}

const UserView = () => {
    const id = useParams().id
    const users = useSelector((state) => state.users)
    const targetUser = users.filter((user) => user.id === id)[0]

    return (
        <div>
            <h3>{targetUser.name}</h3>
            <h4>Added blogs:</h4>
            <UserBlogs userId={id} />
        </div>
    )
}

export default UserView
