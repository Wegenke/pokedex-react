import { BrowserRouter as Router } from 'react-router-dom'
import { createRoot } from 'react-dom/client'
import './styles/App.css'
import App from './App'
// import { StrictMode } from 'react'

createRoot(document.getElementById('root')).render(
  <Router>
    <App />
  </Router>,
)
