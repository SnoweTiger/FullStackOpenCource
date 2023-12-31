import { useState } from 'react'

import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Menu from './components/Menu'
import About from './components/About'
import Footer from './components/Footer'
import AnecdoteList from './components/AnecdotesList'
import Anecdote from './components/Anecdote'
import CreateNew from './components/Create'
import Notification from './components/Notification'

const App = () => {

    const [anecdotes, setAnecdotes] = useState([
        {
            content: 'If it hurts, do it more often',
            author: 'Jez Humble',
            info: 'https://martinfowler.com/bliki/FrequencyReducesDifficulty.html',
            votes: 0,
            id: 1
        },{
            content: 'Premature optimization is the root of all evil',
            author: 'Donald Knuth',
            info: 'http://wiki.c2.com/?PrematureOptimization',
            votes: 0,
            id: 2
        }
    ])

    const [notification, setNotification] = useState('')

    const addNew = (anecdote) => {
        anecdote.id = Math.round(Math.random() * 10000)
        setAnecdotes(anecdotes.concat(anecdote))
        setNotification(`Add new anecdote: ${ anecdote.content }`)
        setTimeout(() => setNotification(''), 3000)
    }

    const anecdoteById = (id) => anecdotes.find(a => a.id === id)

    const vote = (id) => {
      const anecdote = anecdoteById(id)

      const voted = {
        ...anecdote,
        votes: anecdote.votes + 1
      }

      setAnecdotes(anecdotes.map(a => a.id === id ? voted : a))
    }

    return (
        <BrowserRouter>
            <h1>Software anecdotes</h1>
            <Menu />
            <Notification text={notification} />
            
            <Routes>
            <Route path="/create" element={<CreateNew addNew={addNew} />} />
            <Route path="/about" element={<About />} />
            <Route path="/" element={<AnecdoteList anecdotes={anecdotes} />} />
            <Route path="/anecdote/:id" element={<Anecdote anecdotes={anecdotes} />} />
            </Routes>

            <Footer />    
        </BrowserRouter>
    )
}

export default App