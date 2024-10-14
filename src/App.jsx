import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Landingpage from './pages/Landingpage';
import Login from './pages/Login';
import Navbar from './components/Navbar';

const App = () => {
  return (
    <div className='App'>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" exact Component={ Landingpage } />
          <Route path="/login" exact Component={ Login } />
        </Routes>
      </Router>
    </div>
  )
}

export default App


