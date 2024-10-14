import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Landingpage from './pages/Landingpage';
import Login from './pages/Login';

const App = () => {
  return (
    <div className='App'>
      <Router>
        <Routes>
          <Route path="/" exact Component={ Login } />
        </Routes>
      </Router>
    </div>
  )
}

export default App


