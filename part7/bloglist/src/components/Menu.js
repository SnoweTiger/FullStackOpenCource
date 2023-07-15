// import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { logoutUser } from '../reducers/userReducer'

import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import Button from 'react-bootstrap/Button'

const Menu = () => {
    const dispatch = useDispatch()
    const user = useSelector((state) => state.user)

    return (
        <Navbar bg="light" data-bs-theme="light">
            <Nav className="me-auto">
                <Nav.Link href="/">Blogs</Nav.Link>
                <Nav.Link href="/users">Users</Nav.Link>
            </Nav>
            <Nav className="justify-content-end">
                <p style={{ paddingRight: '10px', paddingTop: '10px' }}>
                    You logged as {user.name}
                </p>
                <Button
                    variant="outline-success"
                    onClick={() => dispatch(logoutUser())}
                >
                    LogOut
                </Button>
            </Nav>
        </Navbar>
    )
}

export default Menu
