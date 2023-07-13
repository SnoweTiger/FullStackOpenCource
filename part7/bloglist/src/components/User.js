import { useDispatch, useSelector } from 'react-redux'
import { logoutUser } from '../reducers/userReducer'

const User = () => {
    const dispatch = useDispatch()
    const user = useSelector((state) => state.user)

    return (
        <div>
            {user.name} logged in
            <button onClick={() => dispatch(logoutUser())}>LogOut</button>
        </div>
    )
}

export default User
