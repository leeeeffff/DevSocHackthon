import React, { useState } from 'react';
import '../style/SignUp.css'; // Make sure to create and link a corresponding CSS file
import logo from '../assets/Logo1.png'; // Adjust the path based on the structure
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
    setError(''); // Clear the error if passwords match
    console.log('Email:', email);
    console.log('Password:', password);
    // Implement your SignUp logic here
  };

  const handleGoogleSignUp = () => {
    console.log('SignUp with Google');
    // Implement Google SignUp logic here
  };

  const handleGithubSignUp = () => {
    console.log('SignUp with Github');
    // Implement Github SignUp logic here
  };

  return (
    <div className="SignUp-page">
      {/* Logo at the top left */}
      <div className="navbar">
        <img src={logo} alt="Logo" className="logo" />
      </div>

      <Link to="/" className="back-arrow">
        <div className="arrow-left">
          <span></span>
        </div>
        <span className="back-text">Back to Portfolio</span>
      </Link>
      
      {/* Main SignUp content */}
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

        {/* SignUp form */}
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

          {/* Error message for password mismatch */}
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








// import React, { useState } from 'react';
// import '../style/Part.css';
// import InvestImg from '../assets/Timeline/Competitions/investmentsociety.png'; // Replace with actual paths
// import UniImg from '../assets/Timeline/Competitions/unihack.png'; 
// import AtlaImg from '../assets/Timeline/Competitions/atlassian.png'; 
// import BcgImg from '../assets/Timeline/Competitions/BCG.png'; 
// import FactImg from '../assets/Timeline/Competitions/factset.png'; 

// const competitions = {
//   "Investment Society": {
//     title: "Investment Society",
//     subtitle: "University of toronto - Investment Case Competition",
//     description: "The Investment Society competition challenges participants to analyze markets, identify investment opportunities, and pitch strategies. In a simulated commodities trading environment, prices of gold and oil fluctuate based on real-time news and competitor actions. Across four rounds, participants must adapt their strategies and outmaneuver rivals in a dynamic trading scenario.",
//     image: InvestImg
//   },
//   "Unihack X Atlassian": {
//     title: "Unihack X Atlassian",
//     subtitle: "UNSW - UNIHACK X ATLASSIAN HACKATHON",
//     description: "A collaborative hackathon where students build innovative tech projects, showcasing creativity and problem-solving. Our team created Drive, a gym-focused social media app that motivates users to stay consistent by enforcing consequences for missing scheduled workouts.",
//     image: [UniImg, AtlaImg]
//   },
//   bcg: {
//     title: "BCG Case Competition",
//     subtitle: "UNSW - BCG CONSULTING CASE COMPETITION",
//     description: "The BCG Case Competition, a business challenge that tests participants' problem-solving, analytical thinking, and presentation skills. Our team tackled a consulting case for a theoretical clothing brand facing expansion challenges and struggling to define its identity between luxury and streetwear markets. We conducted market sizing to assess the brand's growth potential in different markets, helping inform strategic recommendations for positioning and expansion.",
//     image: BcgImg
//   },
//   factset: {
//     title: "Factset Challenge",
//     subtitle: "UNSW - FACTSET INVESTMENT CASE COMPETITION",
//     description: "The Factset Challenge is an investment competition where students analyze data, make investment recommendations, and justify their decisions. Our case focused on Australian stocks listed on the ASX, requiring a deep dive into market trends and company performance.",
//     image: FactImg
//   }
// };
// const Part = () => {
//   const [activePoint, setActivePoint] = useState(0); // Track active point

//   const handleClick = (competitionKey, pointNumber) => {
//     setActivePoint(pointNumber); // Set the active point when clicked
//   };

//   return (
//     <div className='Part-container'>
//       {/* Horizontal line with dynamic progress */}
//       <div className="horizontal-line">
//         {/* Points with dynamic active classes */}
//         <div className={`point ${activePoint >= 1 ? 'active' : ''}`} onClick={() => handleClick('Investment Society', 1)}></div>
//         <div className={`point ${activePoint >= 2 ? 'active' : ''}`} onClick={() => handleClick('Unihack X Atlassian', 2)}></div>
//         <div className={`point ${activePoint >= 3 ? 'active' : ''}`} onClick={() => handleClick('bcg', 3)}></div>
//         <div className={`point ${activePoint >= 4 ? 'active' : ''}`} onClick={() => handleClick('factset', 4)}></div>

//         {/* Green progress line */}
//         <div className={`progress-line ${activePoint >= 1 ? 'progress' : ''} ${activePoint >= 2 ? 'progress-2' : ''} ${activePoint >= 3 ? 'progress-3' : ''} ${activePoint >= 4 ? 'progress-4' : ''}`}></div>
//       </div>

//       <div className="competition-info-container">
//         {Object.keys(competitions).map((key) => (
//           <div
//             key={key}
//             className={`competition-info ${activePoint === Object.keys(competitions).indexOf(key) + 1 ? 'active' : ''}`}
//           >
//             <h2 className='title'>{competitions[key].title}</h2>
//             <h3 className="subtitle">{competitions[key].subtitle}</h3>
//             <p className="description">{competitions[key].description}</p>
//             {Array.isArray(competitions[key].image) ? (
//               <div>
//                 {competitions[key].image.map((imgSrc, index) => (
//                   <img key={index} src={imgSrc} alt={competitions[key].title} style={{ width: '100px', margin: '10px' }} />
//                 ))}
//               </div>
//             ) : (
//               <img src={competitions[key].image} alt={competitions[key].title} style={{ width: '200px', margin: '10px', height: 'auto' }} />
//             )}
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Part;