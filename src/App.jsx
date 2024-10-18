import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Landingpage from './pages/Landingpage';
import Login from './pages/Login';
import Ai from './pages/Ai';  // Import the AI page
import SignUp from './pages/SignUp';
import FormPage from './pages/FormPage';
import AboutPage from './pages/AboutPage';
import ProfilePage from './pages/ProfilePage';
import Settings from './pages/Settings';
import Chat from './pages/Chat';

const App = () => {
  return (
    <div className='App'>
      <Router>
        <Routes>
          <Route path="/" exact Component={Landingpage} />
          <Route path="/Ai" exact Component={Ai} />
          <Route path="/AboutPage" exact Component={ AboutPage } />
          <Route path="/login" exact Component={ Login } />
          <Route path="/SignUp" exact Component={ SignUp } />
          <Route path="/Chat" exact Component={ Chat } />
          <Route path="/FormPage" exact Component={ FormPage } />
          <Route path="/ProfilePage" exact Component={ ProfilePage } />
          <Route path="/Settings" exact Component={ Settings } />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
