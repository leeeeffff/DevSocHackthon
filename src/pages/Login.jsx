import React, { useState } from "react";
import "../style/Login.css";
import logo from "../assets/Logo1.png";
import GoogleLogo from "../assets/GoogleLogo.png";
import GithubLogo from "../assets/GithubLogo.png";
import { Link } from "react-router-dom";
import Nav from '../components/Signnav';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleInputChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        console.log('Login successful', data);
        alert('Login successful');
        // Redirect to the dashboard
        window.location.href = '/dashboard';
      } else {
        setError(data.message);
      }
    } catch (error) {
      console.error('Error during login:', error);
      setError('An error occurred. Please try again later.');
    }
  };

  const handleGoogleLogin = () => {
    window.location.href = 'http://localhost:5000/api/auth/google'; // Redirect to Google OAuth
  };

  const handleGitHubLogin = () => {
    window.location.href = 'http://localhost:5000/api/auth/github'; // Redirect to GitHub OAuth
  };

  return (
    <div>
      <Nav/>
    <div className="login-page">
      {/* Back to Home Link */}
      <Link to="/" className="back-arrow">
        <div className="arrow-left">
          <span></span>
        </div>
        <span className="back-text">Back to Home Page</span>
      </Link>

      <div className="login-container">
        <h1>Choose your path...</h1>
        <p>Log in to your account</p>

        <button onClick={handleGoogleLogin} className="login-button google">
          <img src={GoogleLogo} alt="Google" className="google-logo" />
          Continue with Google
        </button>

        <button onClick={handleGitHubLogin} className="login-button github">
          <img src={GithubLogo} alt="Github" className="github-logo" />
          Continue with Github
        </button>

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

          {error && <p className="error-message">{error}</p>}

          <button type="submit" className="continue-button">
            Continue
          </button>
        </form>

        {/* Prompt to sign-up page for users without an account */}
        <p className="signup-prompt">
          Don't have an account? <Link to="/signup" className="lol">Sign Up</Link>
        </p>
      </div>
    </div>
    </div>
  );
};

export default Login;