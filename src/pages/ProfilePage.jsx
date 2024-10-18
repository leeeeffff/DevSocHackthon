import React, { useState } from 'react';
import '../style/ProfilePage.css'; // Make sure to create and link a corresponding CSS file
import avatar from '../assests/images/circle.png'; // Replace with the actual path to your avatar image
import Navbaradvice from '../components/Navbaradvice';

const ProfilePage = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [careers, setCareers] = useState({
    career1: '',
    career2: '',
    career3: '',
  });

  const careerOptions = [
    "Architecture, Planning & Construction Management",
    "Business & Commerce",
    "Data & Technology",
    "Education, Teaching & Social Work",
    "Engineering",
    "Humanities & Social Sciences",
    "Law & Criminal Justice",
    "Media, Design & Fine Arts",
    "Medicine & Health Science",
    "Science & Environment"
  ];

  const handleEditClick = () => {
    setIsEditing(!isEditing);
  };

  const handleCareerChange = (e) => {
    const { name, value } = e.target;
    setCareers((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="profile-page">
      <Navbaradvice />
      <div className="header">
        <h2>
          <span className="typing-animation">Welcome, John</span>
        </h2>
        <p>{new Date().toDateString()}</p>
      </div>

      <div className="profile-container">
        <div className="profile-header">
          <img src={avatar} alt="User Avatar" className="avatar" />
          <div className="user-info">
            <h3>John Doe</h3>
            <p>johndoe123@gmail.com</p>
          </div>
          <button className="edit-button" onClick={handleEditClick}>
            {isEditing ? 'Save' : 'Edit'}
          </button>
        </div>

        <div className="profile-form">
          <div className="form-row">
            <div className="form-group">
              <label>Full Name</label>
              <input type="text" placeholder="Your Full Name" disabled={!isEditing} />
            </div>
            <div className="form-group">
              <label>Age</label>
              <input type="number" placeholder="Age" disabled={!isEditing} />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Gender</label>
              <input type="text" placeholder="Gender" disabled={!isEditing} />
            </div>
            <div className="form-group">
              <label>Student Type</label>
              <select disabled={!isEditing}>
                <option>Domestic</option>
                <option>International</option>
              </select>
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Degree</label>
              <input type="text" placeholder="Your Degree" disabled={!isEditing} />
            </div>
            <div className="form-group">
              <label>Year</label>
              <select disabled={!isEditing}>
                <option>1</option>
                <option>2</option>
                <option>3</option>
                <option>4</option>
              </select>
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>I am planning to do summer terms in</label>
              <input type="text" placeholder="Year 1,2,3 or 4" disabled={!isEditing} />
            </div>
            <div className="form-group">
              <label>What career are you looking into?</label>
              <div className="career-select">
                <select name="career1" value={careers.career1} onChange={handleCareerChange} disabled={!isEditing}>
                  <option value="">Select Career 1</option>
                  {careerOptions.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>

                <select name="career2" value={careers.career2} onChange={handleCareerChange} disabled={!isEditing}>
                  <option value="">Select Career 2</option>
                  {careerOptions.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>

                <select name="career3" value={careers.career3} onChange={handleCareerChange} disabled={!isEditing}>
                  <option value="">Select Career 3</option>
                  {careerOptions.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>

        <div className="email-section">
          <h4>My email address</h4>
          <p>johndoe123@gmail.com</p>
          <button className="change-email-button">Change email address</button>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;