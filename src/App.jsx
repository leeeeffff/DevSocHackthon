import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Landingpage from './pages/Landingpage';
import Ai from './pages/Ai';  // Import the AI page
import Chat from './pages/Chat';

const App = () => {
  return (
    <div className='App'>
      <Router>
        <Routes>
          <Route path="/" exact Component={Landingpage} />
          <Route path="/Ai" exact Component={Ai} />
          <Route path="/Chat" exact Component={Chat} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
