import React, { useState } from 'react';
import '../style/Login.css'; // Make sure to create and link a corresponding CSS file
import logo from '../assets/Logo1.png'; // Adjust the path based on the structure
import GoogleLogo from '../assets/GoogleLogo.png'
import GithubLogo from '../assets/GithubLogo.png'

const Login = () => {
  const [email, setEmail] = useState('');

  const handleInputChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Email:', email);
    // Implement your email login logic here
  };

  const handleGoogleLogin = () => {
    console.log('Login with Google');
    // Implement Google login logic here
  };

  const handleAppleLogin = () => {
    console.log('Login with Apple');
    // Implement Apple login logic here
  };

  const handleSSOLogin = () => {
    console.log('Login with SSO');
    // Implement SSO logic here
  };

  return (
    <div className="login-page">
    
     {/* Logo at the top left */}
     <div className="navbar">
        <img src={logo} alt="Logo" className="logo" />
      </div>
      
      {/* Main login content */}
      <div className="login-container">
        <h1>Choose your path...</h1>
        <p>Log in to your account</p>

        <button onClick={handleGoogleLogin} className="login-button google">
          <img src={GoogleLogo} alt="Google" className="google-logo" />
          Continue with Google
        </button>
        
        <button onClick={handleAppleLogin} className="login-button github">
          <img src={GithubLogo} alt="Github" className="github-logo" />
          Continue with Github
        </button>

        {/* <button onClick={handleSSOLogin} className="login-button sso">
          <img src="path_to_sso_icon" alt="SSO" />
          Single sign-on (SSO)
        </button> */}

        <hr className="separator" />

        <form onSubmit={handleSubmit}>
          <label className="email-label">Email</label>
          <input
            type="email"
            value={email}
            onChange={handleInputChange}
            placeholder="Enter your email address..."
            required
          />
          <button type="submit" className="continue-button">
            Continue
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;