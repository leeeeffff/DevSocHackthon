import React, { useState } from 'react';
import '../style/Login.css';
import logo from '../assets/Logo1.png';
import GoogleLogo from '../assets/GoogleLogo.png';
import GithubLogo from '../assets/GithubLogo.png';
import { Link } from 'react-router-dom';


const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleInputChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Email:', email);
    console.log('Password:', password);
  };

  const handleGoogleLogin = () => {
    console.log('Login with Google');
  };

  const handleAppleLogin = () => {
    console.log('Login with Apple');
  };

  const handleSSOLogin = () => {
    console.log('Login with SSO');
  };

  return (
    <div className="login-page">
      <Link to="/" className="back-arrow">
        <div className="arrow-left">
          <span></span>
        </div>
        <span className="back-text">Back to Portfolio</span>
      </Link>
     <div className="navbar">
        <img src={logo} alt="Logo" className="logo" />
      </div>
      
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

          <label className="password-label">Password</label>
          <input
            type="password"
            value={password}
            onChange={handlePasswordChange}
            placeholder="Enter your password..."
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
