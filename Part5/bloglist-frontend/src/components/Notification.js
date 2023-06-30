const Notification = ({ message }) => {

  const messageStyle = {
    background: 'lightgrey',
    fontSize: 20,
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10
  }

  if (message === null) {
    return null
  }

  if (message.type === 0) {
    return (
      <div style={{...messageStyle, color: 'red'}}>
        {message.text}
      </div>
    )
  } else {
    return (
      <div style={{...messageStyle, color: 'green'}}>
          {message.text}
      </div>
    )
  }
}

export default Notification