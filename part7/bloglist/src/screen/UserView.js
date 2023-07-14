import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'

const UserBlogs = ({ userId }) => {
    const blogs = useSelector((state) => state.blogs)
    const filteredBlogs = blogs.filter((blog) => blog.user.id === userId)

    if (!filteredBlogs) {
        return null
    }

    return (
        <ul>
            {filteredBlogs.map((blog) => (
                <li key={blog.id}>{blog.title}</li>
            ))}
        </ul>
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
