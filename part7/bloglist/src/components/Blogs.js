import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import Table from 'react-bootstrap/Table'

const Blogs = () => {
    const blogs = useSelector((state) => state.blogs)

    if (blogs && blogs.length) {
        return (
            <Table striped bordered hover>
                <tbody>
                    {blogs.map((blog) => (
                        <tr key={blog.id}>
                            <td>
                                <Link to={`/blog/${blog.id}`}>
                                    {blog.title}
                                </Link>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        )
    } else {
        return null
    }
}

export default Blogs
