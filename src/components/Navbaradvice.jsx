import React, { useState } from 'react';
import '../style/Navbaradvice.css';
import Logo from "../assests/logo/logo1.png";
import Profile from '../assests/images/profile.png';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen((prev) => !prev);
  };

  return (
    <div className='navbar'>
      <div className='leftSide'>
        <img src={Logo} alt="Logo" />
        Pathways
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
              <Link to="/profile" className="dropdown-item">Profile</Link>
              <Link to="/settings" className="dropdown-item">Settings</Link>
              <Link to="/logout" className="dropdown-item">Log Out</Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
