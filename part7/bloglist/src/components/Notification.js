import { useSelector } from 'react-redux'
import Alert from 'react-bootstrap/Alert'

const Notification = () => {
    const notification = useSelector((state) => state.notification)

    if (notification.text === null) {
        return null
    }

    if (notification.type === 0) {
        return <Alert variant="danger">{notification.text}</Alert>
    } else {
        return <Alert variant="success">{notification.text}</Alert>
    }
}

export default Notification
