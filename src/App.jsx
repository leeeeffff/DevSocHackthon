import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Landingpage from './pages/Landingpage';
import Navbar from './components/Navbar';
import Ai from './pages/Ai';  // Import the AI page

const App = () => {
  return (
    <div className='App'>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" exact Component={Landingpage} />
          <Route path="/Ai" exact Component={Ai} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
