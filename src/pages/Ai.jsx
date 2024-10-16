import React, { useState } from 'react';

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
      <h1>AI Degree Planner</h1>
      <button onClick={runAiHandler}>Run AI</button>

      {coursePlan && (
        <div>
          <h2>Course Plan:</h2>
          {Object.entries(coursePlan).map(([term, courses]) => (
            <p key={term}>
              {term}: {courses.join(', ')}
            </p>
          ))}
        </div>
      )}

      {reasoning && (
        <div>
          <h2>Reasoning:</h2>
          <p>{reasoning}</p>
        </div>
      )}
    </div>
  );
};

export default Ai;
