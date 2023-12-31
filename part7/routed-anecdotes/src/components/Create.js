import { useNavigate } from 'react-router-dom'
import  { useField } from '../hooks'

const CreateNew = (props) => {

    const content = useField('text')
    const author = useField('text')
    const info = useField('text')
    const navigate = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault()
        props.addNew({
            content: content.value,
            author: author.value,
            info: info.value,
            votes: 0
        })
        navigate('/')
    }

    const handleReset = () => {
        content.resetValue()
        author.resetValue()
        info.resetValue()
    }

    return (
        <div>
            <h2>create a new anecdote</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    content
                    <input {...(delete content.resetValue && content)} />
                </div>
                <div>
                    author
                    <input {...(delete author.resetValue && author)} />
                </div>
                <div>
                    url for more info
                    <input {...(delete info.resetValue && info)} />
                </div>
                <button type="submit">create</button>
                <button type="button" onClick={() => handleReset()}>reset</button>
            </form>
        </div>
    )
}

export default CreateNew