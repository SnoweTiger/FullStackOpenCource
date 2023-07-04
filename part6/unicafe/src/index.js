import React from 'react'
import ReactDOM from 'react-dom/client'
import { createStore } from 'redux'

// import App from './App'
import feedbackReducer from './reducers/feedbackReducer'
import App from './App'

const store = createStore(feedbackReducer)

const root = ReactDOM.createRoot(document.getElementById('root'))
// const root = ReactDOM.createRoot(document.getElementById('root')).render(<App />)

const renderApp = () => {
    root.render(<App store={store}/>)
}

renderApp()
store.subscribe(renderApp)