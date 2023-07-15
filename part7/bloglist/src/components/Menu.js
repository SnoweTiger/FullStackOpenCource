import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { logoutUser } from '../reducers/userReducer'

const Menu = () => {
    const dispatch = useDispatch()
    const user = useSelector((state) => state.user)

    return (
        <div>
            <Link to="/">Blogs</Link>
            <Link to="/users">Users</Link>
            You logged as {user.name}
            <button onClick={() => dispatch(logoutUser())}>LogOut</button>
        </div>
    )
}

export default Menu
