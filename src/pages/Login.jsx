import React, { useState } from "react";
import "../style/Login.css"; // Ensure this file contains your custom styles
import logo from "../assets/Logo1.png"; // Adjust the path based on your structure
import GoogleLogo from "../assets/GoogleLogo.png";
import GithubLogo from "../assets/GithubLogo.png";
import { Link } from "react-router-dom";

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

  const handleGitHubLogin = () => {
    console.log('Login with Github');
  };

  return (
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

          <button type="submit" className="continue-button">
            Continue
          </button>
        </form>

        {/* Prompt to sign-up page for users without an account */}
        <p className="signup-prompt">
          Don't have an account? <Link to="/signup">Sign Up</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;