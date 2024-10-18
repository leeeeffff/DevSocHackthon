import React, { useRef, useEffect } from "react";
import '../style/Landingpage.css';
import Landingbanner from '../components/Landingbanner';
import Circle from '../assests/images/circle.png';
import Square from "../assests/images/square.png";
import Tri from '../assests/images/tri.png';
import Navbar from '../components/Navbar';

const Landingpage = () => {
  return (
    <div className='Landingpage'>
      <Navbar/>
      <Landingbanner />
      <div className="content">
        <h1 className="h1"></h1>
      </div>

      <img src={Circle} alt="Circle_design" className='Circle_design' />
      <img src={Square} alt="Square_design" className='Square_design' />
      <img src={Tri} alt="Tri_design" className='Tri_design' />

      {/* Centered text above the shapes */}
      <div className="how-it-works-container">
        <h1 className="how-it-works-text">How Our Product Works</h1>
      </div>

      <div className='shapes-container'>
        <div className="shape-description">
          <img src={Circle} alt="Circle" className='shape circle' />
          <p className="description">
            The user inputs essential information through a series of questions designed to capture their academic interests, schedule preferences, and future goals.
          </p>
        </div>
        <div className="shape-description">
          <img src={Square} alt="Square" className='shape square' />
          <p className="description">
            This data is securely processed into our database, where it is fed into a trained AI model that tailors a degree plan based on the user’s specific input.
          </p>
        </div>
        <div className="shape-description">
          <img src={Tri} alt="Triangle" className='shape triangle' />
          <p className="description">
            The AI generates the most optimal degree plan, providing detailed reasoning for the course layout and crafting a timetable that maximizes efficiency and success.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Landingpage;
