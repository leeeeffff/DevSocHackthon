import React from 'react';
import '../style/AboutPage.css';

const AboutPage = () => {
  return (
    <div className='AboutPage'>
      <h1 className='h1'>About PathWays</h1>
      <p className='vision'>Shaping the Future of Learning with AI-Driven Course Guidance</p>

      <div className="image-text-container">
        <img src="./src/images/AboutPage-1.JPG" alt="About Page" className="about-image" />
        <p className='image-paragraph'>
          Hi UNSW students! If you are struggling checking out different COMP courses on hundreds of tabs, you're probably like me—spending a lot of time just to find the most suitable one for me.
        </p>
      </div>

      <div className="image-text-container">
        <img src="./src/images/AboutPage-2.JPG" alt="About Page" className="about-image" />
        <p className='image-paragraph'>
          You probably have like a hundred tabs open: one for COMP1511, one for COMP1531, one for COMP1521, and on, and on...
          But have you ever wondered how to save all this time scrolling tirelessly since you're technically a Computer Science student?
          To help you save your valuable time, we decided to create PathWays, the ultimate AI helper to make your life easier.
        </p>
      </div>

      <section className='about-section'>
        <h2>About Pathways</h2>
        <p>
          At <strong>Pathways</strong>, we’re transforming how UNSW Computer Science students navigate their academic journeys.
          University can be overwhelming—deciding which courses to take, figuring out prerequisites, and planning your path to graduation. That’s where we come in.
        </p>

        <h2>Our Mission</h2>
        <p>
          We believe that every student deserves personalized guidance to help them make informed decisions about their education.
          <strong>Pathways</strong> is designed to take the guesswork out of course selection by using AI to recommend courses tailored to your academic history, interests, and goals.
        </p>
        <p>
          Our mission is simple: to help you build a clear and efficient path through your degree so that you can focus on what matters most—learning.
        </p>

        <h2>Why Pathways?</h2>
        <p>
          Choosing the right courses is one of the most important parts of your university experience, and yet, it’s often confusing and time-consuming.
          <strong>Pathways</strong> is built to simplify this process. Our AI recommends courses that align with your skills, preferences, and future goals, ensuring you stay on track with your degree requirements while also exploring topics that excite you.
        </p>

        <ul>
          <li><strong>Personalized Course Recommendations:</strong> Based on your major, progress, and preferences.</li>
          <li><strong>Clear Prerequisite Pathways:</strong> We ensure you never miss out on a course because of overlooked prerequisites.</li>
          <li><strong>Time-saving Planning Tools:</strong> Spend less time worrying about course planning and more time diving into the subjects you love.</li>
        </ul>

        <h2>How Pathways Works</h2>
        <p>
          Our AI-driven recommendation system analyzes the UNSW Computer Science curriculum, your past course choices, and your academic goals.
          By using data and machine learning, we provide a tailored list of courses that suit your interests and degree progress, helping you explore electives or find the best path to graduation.
        </p>
        <p>
          Whether you’re looking for core courses or want to discover new electives, <strong>Pathways</strong> makes course selection easier, smarter, and more personalized.
        </p>

        <blockquote className='quote'>
          “The people who are crazy enough to think they can change the world are the ones who do.”<br />
        <span className='quote-author'>— Steve Jobs, co-founder of Apple</span>
        </blockquote>

        <h2>The Team Behind Pathways</h2>
        <p>
          We’re a group of passionate UNSW students and developers who saw a need for better course guidance in the Computer Science community.
          <strong>Pathways</strong> was built with one goal in mind: helping our fellow students find their way. From AI researchers to UX designers,
          our diverse team is dedicated to building tools that simplify your academic experience and make learning more accessible.
        </p>
      </section>

      <h2 className='aboutTeam'>Meet Our Team</h2>
      <div className='team-section'>
        <div className='team-member'>
          <img src="./src/images/BrianDang.jpg" alt="Brian Dang" className='team-photo' />
          <p><strong>Brian Dang</strong><br />Software Engineer</p>
        </div>

        <div className='team-member'>
          <img src="./src/images/BalGurdiraj.jpg" alt="Bal Gurdiraj" className='team-photo' />
          <p><strong>Gurdiraj Bal</strong><br />Database Engineer</p>
        </div>

        <div className='team-member'>
          <img src="./src/images/KellyDang.jpg" alt="Kelly Dang" className='team-photo' />
          <p><strong>Kelly Dang</strong><br />Product Owner</p>
        </div>

        <div className='team-member'>
          <img src="./src/images/LeeChang.jpg" alt="Chang Hyun Lee" className='team-photo' />
          <p><strong>Chang Hyun Lee</strong><br />Tech Lead</p>
        </div>

        <div className='team-member'>
          <img src="./src/images/WorangVittorio.jpg" alt="Worang Vittorio" className='team-photo' />
          <p><strong>Vittorio Worang</strong><br />Software Engineer</p>
        </div>
      </div>

      <section className='join-us'>
        <h2>Join Us</h2>
        <p>
          Pathways is based at UNSW, and we’re a diverse group of students and developers passionate about improving the university experience.
          We’re interested in everything from computing and AI to learning optimization and helping students make informed decisions.
        </p>
        <p>
          Interested in joining us? <a href="#">Learn more here 👈</a>
        </p>
      </section>

      <footer className="footer">
        <div className="footer-top">
          <div className="newsletter">
            <input type="email" placeholder="Enter your email..." className="email-input" />
            <button className="signup-button">Sign up</button>
          </div>
        </div>
        <div className="footer-bottom">
          <div className="footer-left">
            <img src="./src/images/logo.jpg" alt="Company Logo" className="footer-logo" />
            <div className="social-icons">
              <a href="https://instagram.com">
              <img src="./src/images/instagram.svg" alt="Instagram" style={{ width: '24px', height: '24px' }} />
              </a>
              <a href="https://x.com" target="_blank" rel="noopener noreferrer">
              <img src="./src/images/x.svg" alt="X" style={{ width: '24px', height: '24px' }} />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
              <img src="./src/images/linkedin.svg" alt="LinkedIn" style={{ width: '24px', height: '24px' }} />
              </a>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
              <img src="./src/images/facebook.svg" alt="Facebook" style={{ width: '24px', height: '24px' }} />
              </a>
              <a href="https://youtube.com" target="_blank" rel="noopener noreferrer">
              <img src="./src/images/youtube.svg" alt="YouTube" style={{ width: '24px', height: '24px' }} />
              </a>
            </div>
            <p>&copy; 2024 Pathways Labs, Inc.</p>
          </div>
          <div className="footer-right">
            <div className="footer-columns">
              <div className="footer-column">
                <h4>Company</h4>
                <ul>
                  <li><a href="#">About us</a></li>
                  <li><a href="#">Careers</a></li>
                  <li><a href="#">Security</a></li>
                  <li><a href="#">Status</a></li>
                  <li><a href="#">Terms & privacy</a></li>
                </ul>
              </div>
              <div className="footer-column">
                <h4>Download</h4>
                <ul>
                  <li><a href="#">iOS & Android</a></li>
                  <li><a href="#">Mac & Windows</a></li>
                  <li><a href="#">Calendar</a></li>
                  <li><a href="#">Web Clipper</a></li>
                </ul>
              </div>
              <div className="footer-column">
                <h4>Resources</h4>
                <ul>
                  <li><a href="#">Help center</a></li>
                  <li><a href="#">Pricing</a></li>
                  <li><a href="#">Blog</a></li>
                  <li><a href="#">Community</a></li>
                  <li><a href="#">Integrations</a></li>
                </ul>
              </div>
              <div className="footer-column">
                <h4>Pathways for</h4>
                <ul>
                  <li><a href="#">Students</a></li>
                  <li><a href="#">Instructors</a></li>
                  <li><a href="#">Researchers</a></li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default AboutPage;
