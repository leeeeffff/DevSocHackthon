import React, { useState } from 'react';
import '../style/SignUp.css'; // Ensure this file contains your custom styles
import logo from '../assets/Logo1.png'; // Adjust the path based on your structure
import GoogleLogo from '../assets/GoogleLogo.png';
import GithubLogo from '../assets/GithubLogo.png';
import { Link } from 'react-router-dom';

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
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        console.log('Sign-up successful', data);
        alert('Sign-up successful');
      } else {
        setError(data.message);
      }

    } catch (error) {
      console.error('Error during sign-up:', error);
      setError('An error occurred. Please try again later.');
    }
  };

  // Redirect to the Google OAuth route
  const handleGoogleSignUp = () => {
    window.location.href = 'http://localhost:5000/api/auth/google';
  };

  // Redirect to the GitHub OAuth route
  const handleGithubSignUp = () => {
    window.location.href = 'http://localhost:5000/api/auth/github';
  };

  return (
    <div className="SignUp-page">
      {/* Back to Home Link */}
      <Link to="/" className="back-arrow">
        <div className="arrow-left">
          <span></span>
        </div>
        <span className="back-text">Back to Home Page</span>
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

        {/* Prompt for existing users */}
        <p className="login-prompt">
          Already have an account? <Link to="/login">Log In</Link>
        </p>
      </div>
    </div>
  );
};

export default SignUp;