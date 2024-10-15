import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Landingpage from './pages/Landingpage';
import AboutPage from './pages/AboutPage';
import Login from './pages/Login';

const App = () => {
  return (
    <div className='App'>
      <Router>
        <Routes>
          <Route path="/" exact Component={ Landingpage } />
          <Route path="/login" exact Component={ Login } />
          <Route path="/aboutPage" exact Component={ AboutPage } />
        </Routes>
      </Router>
    </div>
  )
}

export default App


