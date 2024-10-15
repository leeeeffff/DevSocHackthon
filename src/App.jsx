import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Landingpage from './pages/Landingpage';
import AboutPage from './pages/AboutPage';
import Login from './pages/Login';
import Navbar from './components/Navbar';

const App = () => {
  return (
    <div className='App'>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" exact Component={ Landingpage } />
        </Routes>
      </Router>
    </div>
  )
}

export default App


