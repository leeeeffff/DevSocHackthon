import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Landingpage from './pages/Landingpage';
import Login from './pages/Login';
import Navbar from './components/Navbar';
import Ai from './pages/Ai';  // Import the AI page
import SignUp from './pages/SignUp';
import SignUp from './pages/FormPage';
import SignUp from './pages/AboutPage';

const App = () => {
  return (
    <div className='App'>
      <Router>  
        <Navbar />
        <Routes>
          <Route path="/" exact Component={Landingpage} />
          <Route path="/Ai" exact Component={Ai} />
          <Route path="/AboutPage" exact Component={ AboutPage } />
          <Route path="/" exact Component={ Landingpage } />
          <Route path="/login" exact Component={ Login } />
          <Route path="/SignUp" exact Component={ SignUp } />
          <Route path="/FormPage" exact Component={ FormPage } />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
