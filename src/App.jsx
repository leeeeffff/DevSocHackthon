import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Landingpage from './pages/Landingpage';
import Login from './pages/Login';
import Navbar from './components/Navbar';
import SignUp from './pages/SignUp';
import AboutPage from './pages/AboutPage';

const App = () => {
  return (
    <div className='App'>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/AboutPage" exact Component={ AboutPage } />
          <Route path="/" exact Component={ Landingpage } />
          <Route path="/login" exact Component={ Login } />
          <Route path="/SignUp" exact Component={ SignUp } />
        </Routes>
      </Router>
    </div>
  )
}

export default App;
