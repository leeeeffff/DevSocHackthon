import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Landingpage from './pages/Landingpage';
import Login from './pages/Login';
import Navbar from './components/Navbar';
import Ai from './pages/Ai';  // Import the AI page
import SignUp from './pages/SignUp';
import FormPage from './pages/FormPage';
import AboutPage from './pages/AboutPage';

const App = () => {
  return (
    <div className='App'>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" exact element={<Landingpage />} />
          <Route path="/Ai" exact element={<Ai />} />
          <Route path="/AboutPage" exact element={<AboutPage />} />
          <Route path="/login" exact element={<Login />} />
          <Route path="/SignUp" exact element={<SignUp />} />
          <Route path="/FormPage" exact element={<FormPage />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
