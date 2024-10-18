import React, { useState } from 'react';
import '../style/Ai.css'; // Import the CSS file
import Navbaradvice from '../components/Navbaradvice';
import Shapew from '../assests/images/shape2.png'

const Ai = () => {
  const [coursePlan, setCoursePlan] = useState(null);
  const [reasoning, setReasoning] = useState(null);

  const runAiHandler = async () => {
    try {
      const response = await fetch('http://127.0.0.1:5000/run-ai', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();
      setCoursePlan(data.course_plan);
      setReasoning(data.reasoning);
    } catch (error) {
      console.error('Error running AI:', error);
    }
  };

  return (
    <div>
      <Navbaradvice />
    <div className="ai-container">
      <h1>AI Degree Planner</h1>
      <button className="run-ai-button" onClick={runAiHandler}>
        <img className = 'shape_img1' src = {Shapew}></img>
      </button>

      {coursePlan && (
        <div className="course-plan-container">
          <h2>Course Plan:</h2>
          <table className="course-plan-table">
            <thead>
              <tr>
                <th>Term</th>
                <th>Course 1</th>
                <th>Course 2</th>
                <th>Course 3</th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(coursePlan).map(([term, courses], index) => (
                <tr key={index}>
                  <td>{term}</td>
                  {courses.slice(0, 3).map((course, i) => (
                    <td key={i}>{course}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {reasoning && (
        <div className="reasoning-container">
          <h2>Reasoning:</h2>
          <p>{reasoning}</p>
        </div>
      )}
    </div>
    </div>
  );
};

export default Ai;
