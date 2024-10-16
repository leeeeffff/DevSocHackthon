import React, { useState } from 'react';
import '../style/SignUp.css';
import logo from '../assets/Logo1.png';
import GoogleLogo from '../assets/GoogleLogo.png';
import GithubLogo from '../assets/GithubLogo.png';
import { Link } from 'react-router-dom'

const SignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === 'email') {
      setEmail(value);
    } else if (name === 'password') {
      setPassword(value);
    } else if (name === 'confirmPassword') {
      setConfirmPassword(value);
    }
  };

  // Handle form submit
  const handleSubmit = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    setError('');
    console.log('Email:', email);
    console.log('Password:', password);
  };

  const handleGoogleSignUp = () => {
    console.log('SignUp with Google');
  };

  const handleGithubSignUp = () => {
    console.log('SignUp with Github');
  };

  return (
    <div className="SignUp-page">
      <div className="navbar">
        <img src={logo} alt="Logo" className="logo" />
      </div>

      <Link to="/" className="back-arrow">
        <div className="arrow-left">
          <span></span>
        </div>
        <span className="back-text">Back to Portfolio</span>
      </Link>
      
      <div className="SignUp-container">
        <h1>Choose your path...</h1>
        <p>Create your account</p>

        <button onClick={handleGoogleSignUp} className="SignUp-button google">
          <img src={GoogleLogo} alt="Google" className="google-logo" />
          Continue with Google
        </button>
        
        <button onClick={handleGithubSignUp} className="SignUp-button github">
          <img src={GithubLogo} alt="Github" className="github-logo" />
          Continue with Github
        </button>

        <hr className="separator" />

        <form onSubmit={handleSubmit}>
          <label className="email-label">Email</label>
          <input
            type="email"
            name="email"
            value={email}
            onChange={handleInputChange}
            placeholder="Enter your email address..."
            required
          />

          <label className="password-label">Password</label>
          <input
            type="password"
            name="password"
            value={password}
            onChange={handleInputChange}
            placeholder="Enter your password..."
            required
          />

          <label className="confirm-password-label">Confirm Password</label>
          <input
            type="password"
            name="confirmPassword"
            value={confirmPassword}
            onChange={handleInputChange}
            placeholder="Confirm your password..."
            required
          />

          {error && <p className="error-message">{error}</p>}

          <button type="submit" className="continue-button">
            Continue
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
