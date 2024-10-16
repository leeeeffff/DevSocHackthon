import React from 'react';
import '../style/Navbar.css';
import Logo from "../assests/logo/logo1.png";
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <div className='navbar'>
      <div className='leftSide'>
        <img src={Logo} alt="Logo" />
        Pathways
      </div>
      {/* Uncomment the below if needed */}
      {/* <div className='middle'>
        <Link to="/Ai" className='Ai'>Check the AI out</Link>
      </div> */}
      <div className='rightSide'>
        <Link to="/login" className='Login'>Login</Link>
        <Link to="/signup" className='Signup'>Sign up</Link>
      </div>
    </div>
  );
}

export default Navbar;
