import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

const getAll = async () => {
    const response = await axios.get(baseUrl)
    return response.data
}

const createNew = async (content) => {
    const object = { 
        content, 
        votes: 0 
    }
    const response = await axios.post(baseUrl, object)
    return response.data
}

const addVote = async (id) => {
    const anecdotes = await axios.get(baseUrl)
    let target = anecdotes.data.filter(anecdote => anecdote.id === id)
    target = target[0]
    
    target.votes = target.votes + 1
    await axios.put(`${baseUrl}/${id}`, target)
    return target
} 

export default { getAll, createNew, addVote }