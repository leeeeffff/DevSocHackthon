import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Landingpage from './pages/Landingpage';
import AboutPage from './pages/AboutPage';

const App = () => {
  return (
    <div className='App'>
      <Router>
        <Routes>

          <Route path="/" exact Component={ AboutPage } />
        </Routes>
      </Router>
    </div>
  )
}

export default App


