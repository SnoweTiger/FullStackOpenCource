import { useSelector } from 'react-redux'

const Notification = () => {
    const notification = useSelector((state) => state.notification)

    const messageStyle = {
        background: 'lightgrey',
        fontSize: 20,
        borderStyle: 'solid',
        borderRadius: 5,
        padding: 10,
        marginBottom: 10,
    }

    if (notification.text === null) {
        return null
    }

    if (notification.type === 0) {
        return (
            <div style={{ ...messageStyle, color: 'red' }}>
                {notification.text}
            </div>
        )
    } else {
        return (
            <div style={{ ...messageStyle, color: 'green' }}>
                {notification.text}
            </div>
        )
    }
}

export default Notification
