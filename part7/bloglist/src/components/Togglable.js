import { useState, forwardRef, useImperativeHandle } from 'react'
import PropTypes from 'prop-types'
import Button from 'react-bootstrap/Button'

const Togglable = forwardRef((props, refs) => {
    const [visible, setVisible] = useState(false)

    const hideWhenVisible = {
        display: visible ? 'none' : '',
        paddingTop: 5,
        paddingBottom: 5,
    }
    const showWhenVisible = {
        display: visible ? '' : 'none',
        paddingTop: 5,
        paddingBottom: 5,
    }

    const toggleVisibility = () => {
        setVisible(!visible)
    }

    useImperativeHandle(refs, () => {
        return {
            toggleVisibility,
        }
    })

    return (
        <div>
            <div style={hideWhenVisible}>
                <Button variant="outline-primary" onClick={toggleVisibility}>
                    {props.label}
                </Button>
            </div>
            <div style={showWhenVisible}>
                {props.children}
                <Button variant="outline-danger" onClick={toggleVisibility}>
                    cancel
                </Button>
            </div>
        </div>
    )
})

Togglable.displayName = 'Togglable'

Togglable.propTypes = {
    label: PropTypes.string.isRequired,
}

export default Togglable
