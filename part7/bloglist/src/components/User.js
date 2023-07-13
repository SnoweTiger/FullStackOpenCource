const User = ({ user, setUser }) => {
    const logoutHandler = () => {
        window.localStorage.removeItem('BlogUser')
        setUser(null)
    }

    return (
        <div>
            {user.name} logged in
            <button onClick={() => logoutHandler()}>LogOut</button>
        </div>
    )
}

export default User
