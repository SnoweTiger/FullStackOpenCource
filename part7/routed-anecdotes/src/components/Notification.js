const Notification = ( {text}) => {

    const style = {
        border: 'solid',
        padding: 10,
        borderWidth: 1
    }

    if (text) {
        return (
            <div style={style}>
                { text }
            </div>
        )
    } else {
        return null
    }  
}

export default Notification