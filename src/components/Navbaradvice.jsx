import React, { useState } from 'react';
import '../style/Navbaradvice.css';
import Logo from "../assests/logo/logo1.png";
import Profile from '../assests/images/profile.png';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <div className='navbar'>
      <div className='leftSide'>
        <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
          <img src={Logo} alt="Logo" />
          Pathways
        </Link>
      </div>

      <div className='rightSide'>
        <div 
          className="profile-container" 
          onMouseEnter={() => setDropdownOpen(true)}
          onMouseLeave={() => setDropdownOpen(false)}
        >
          <img src={Profile} alt="Profile" className="profile-picture" />
          {dropdownOpen && (
            <div className="dropdown-menu">
              <Link to="/ProfilePage" className="dropdown-item">Profile</Link>
              <Link to="/Settings" className="dropdown-item">Settings</Link>
              <Link to="/logout" className="dropdown-item">Log Out</Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
