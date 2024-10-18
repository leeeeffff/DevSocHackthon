import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import '../style/FormPage.css';

const FormPage = () => {
  const location = useLocation();
  // Get userId from either location.state (regular sign-up) or query parameters (OAuth sign-up)
  const userId = location.state?.userId || new URLSearchParams(location.search).get('userId');


  const [formData, setFormData] = useState({
    name: '',
    age: '',
    studentType: '',
    gender: '',
    isCurrentStudent: null,
    yearIn: '',
    major: '',
    coursesDone: '',
    summerTerm: '',
    coursesPerYear: {
      year1: { T1: 1, T2: 1, T3: 1, T0: 1 },
      year2: { T1: 1, T2: 1, T3: 1, T0: 1 },
      year3: { T1: 1, T2: 1, T3: 1, T0: 1 },
      year4: { T1: 1, T2: 1, T3: 1, T0: 1 },
    },
    careers: [], // Step 3 career choices
  });

  const [currentStep, setCurrentStep] = useState(1);
  const [error, setError] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleRadioChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value === 'true' ? true : false
    });
  };

  const handleSliderChange = (e, year, term) => {
    const { value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      coursesPerYear: {
        ...prevState.coursesPerYear,
        [year]: {
          ...prevState.coursesPerYear[year],
          [term]: value
        }
      }
    }));
  };

  const handleCheckboxChange = (e) => {
    const { value, checked } = e.target;
    let updatedCareers = [...formData.careers];

    if (checked) {
      if (updatedCareers.length < 3) {
        updatedCareers.push(value);
      }
    } else {
      updatedCareers = updatedCareers.filter(career => career !== value);
    }

    setFormData({
      ...formData,
      careers: updatedCareers
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // If last step, submit the form
    if (currentStep === 3) {
      try {
        const response = await fetch(`http://localhost:5000/api/auth/users/${userId}/personal-info`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });

        if (response.ok) {
          const data = await response.json();
          console.log('Personal information saved:', data);
          alert('Personal information saved successfully!');
          // Redirect to the dashboard
          window.location.href = '/dashboard';
        } else {
          const errorData = await response.json();
          setError(errorData.message);
          console.error('Error saving personal info:', errorData);
        }

      } catch (error) {
        console.error('Error during form submission:', error);
        setError('An error occurred. Please try again later.');
      }
    } else {
      setCurrentStep(currentStep + 1);  // Go to the next step
    }
  };

  return (
    <div className="form-page">
      <div className="steps-container">
        <div className="step-wrapper">
          <div className={`step ${currentStep >= 1 ? 'active' : ''}`}></div>
          <div className={`line ${currentStep >= 2 ? 'active' : ''}`}></div>
        </div>
        <div className="step-wrapper">
          <div className={`step ${currentStep >= 2 ? 'active' : ''}`}></div>
          <div className={`line ${currentStep >= 3 ? 'active' : ''}`}></div>
        </div>
        <div className="step-wrapper">
          <div className={`step ${currentStep >= 3 ? 'active' : ''}`}></div>
        </div>
      </div>

      {/* Step 1: Personal Information */}
      {currentStep === 1 && (
        <>
          <h1 className="title">Personal Information</h1>
          <form className="form-container" onSubmit={handleSubmit}>
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="Enter your name"
              required
            />

            <label htmlFor="age">Age</label>
            <input
              type="number"
              id="age"
              name="age"
              value={formData.age}
              onChange={handleInputChange}
              placeholder="Enter your age"
              required
            />

            <p>What type of student are you?</p>
            <div className="radio-group">
              <label>
                <input
                  type="radio"
                  name="studentType"
                  value="domestic"
                  checked={formData.studentType === 'domestic'}
                  onChange={handleInputChange}
                />
                Domestic
              </label>

              <label>
                <input
                  type="radio"
                  name="studentType"
                  value="international"
                  checked={formData.studentType === 'international'}
                  onChange={handleInputChange}
                />
                International
              </label>
            </div>

            <label htmlFor="gender">Gender</label>
            <input
              type="text"
              id="gender"
              name="gender"
              value={formData.gender}
              onChange={handleInputChange}
              placeholder="Enter your gender"
              required
            />

            <button type="submit" className="next-button">
              Next
            </button>
          </form>
        </>
      )}

      {/* Step 2: University Information */}
      {currentStep === 2 && (
        <>
          <h1 className="title">University Information</h1>
          <form className="form-container" onSubmit={handleSubmit}>
            <label htmlFor="degree">What degree are you doing?</label>
            <input
              type="text"
              id="degree"
              name="degree"
              value={formData.degree}
              onChange={handleInputChange}
              placeholder="Enter your degree"
              required
            />

            <p>Are you a current student?</p>
            <div className="radio-group">
              <label>
                <input
                  type="radio"
                  name="isCurrentStudent"
                  value="true"
                  checked={formData.isCurrentStudent === true}
                  onChange={handleRadioChange}
                />
                Yes
              </label>

              <label>
                <input
                  type="radio"
                  name="isCurrentStudent"
                  value="false"
                  checked={formData.isCurrentStudent === false}
                  onChange={handleRadioChange}
                />
                No
              </label>
            </div>

            {formData.isCurrentStudent && (
              <>
                <p>What year are you in?</p>
                <div className="radio-group">
                  <label>
                    <input
                      type="radio"
                      name="yearIn"
                      value="1"
                      checked={formData.yearIn === '1'}
                      onChange={handleInputChange}
                    />
                    1
                  </label>
                  <label>
                    <input
                      type="radio"
                      name="yearIn"
                      value="2"
                      checked={formData.yearIn === '2'}
                      onChange={handleInputChange}
                    />
                    2
                  </label>
                  <label>
                    <input
                      type="radio"
                      name="yearIn"
                      value="3"
                      checked={formData.yearIn === '3'}
                      onChange={handleInputChange}
                    />
                    3
                  </label>
                  <label>
                    <input
                      type="radio"
                      name="yearIn"
                      value="4"
                      checked={formData.yearIn === '4'}
                      onChange={handleInputChange}
                    />
                    4
                  </label>
                </div>

                <label htmlFor="major">What is your major?</label>
                <input
                  type="text"
                  id="major"
                  name="major"
                  value={formData.major}
                  onChange={handleInputChange}
                  placeholder="Enter your major"
                  required
                />

                <label htmlFor="coursesDone">What courses have you done?</label>
                <input
                  type="text"
                  id="coursesDone"
                  name="coursesDone"
                  value={formData.coursesDone}
                  onChange={handleInputChange}
                  placeholder="Enter your courses"
                  required
                />
              </>
            )}

            <p>Click on the years you are planning to do summer term</p>
            <div className="radio-group">
              <label>
                <input
                  type="radio"
                  name="summerTerm"
                  value="1"
                  checked={formData.summerTerm === '1'}
                  onChange={handleInputChange}
                />
                1
              </label>

              <label>
                <input
                  type="radio"
                  name="summerTerm"
                  value="2"
                  checked={formData.summerTerm === '2'}
                  onChange={handleInputChange}
                />
                2
              </label>

              <label>
                <input
                  type="radio"
                  name="summerTerm"
                  value="3"
                  checked={formData.summerTerm === '3'}
                  onChange={handleInputChange}
                />
                3
              </label>

              <label>
                <input
                  type="radio"
                  name="summerTerm"
                  value="4"
                  checked={formData.summerTerm === '4'}
                  onChange={handleInputChange}
                />
                4
              </label>
            </div>

            <h2>How many courses are you planning to do each year?</h2>
            {[1, 2, 3, 4].map(year => (
              <div key={year} className="year-section">
                <h3>Year {year}</h3>
                {['T1', 'T2', 'T3', 'T0'].map(term => (
                  <div key={term} className="term-slider">
                    <label>{term}</label>
                    <input
                      type="range"
                      min={0} 
                      max={term === 'T0' ? 2 : 4}
                      value={formData.coursesPerYear[`year${year}`][term]}
                      onChange={(e) => handleSliderChange(e, `year${year}`, term)}
                    />
                    <span>{formData.coursesPerYear[`year${year}`][term]}</span>
                  </div>
                ))}
              </div>
            ))}

            <button type="submit" className="next-button">
              Next
            </button>
          </form>
        </>
      )}

      {/* Step 3: Career Information */}
        {currentStep === 3 && (
          <>
            <h1 className="title">Career Information</h1>
            <form className="form-container" onSubmit={handleSubmit}>
              <p className="description">
                What career are you looking into? (Choose up to 3, minimum 1).
              </p>

              {[
                "Architecture, Planning & Construction Management",
                "Business & Commerce",
                "Data & Technology",
                "Education, Teaching & Social Work",
                "Engineering",
                "Humanities & Social Sciences",
                "Law & Criminal Justice",
                "Media, Design & Fine Arts",
                "Medicine & Health Science",
                "Science & Environment",
              ].map((career) => (
                <div className="checkbox-group" key={career}>
                  <label>
                    <input
                      type="checkbox"
                      name="careers"
                      value={career}
                      checked={formData.careers.includes(career)}
                      onChange={handleCheckboxChange}
                      disabled={
                        formData.careers.length >= 3 && !formData.careers.includes(career)
                      }
                    />
                    {career}
                  </label>
                </div>
              ))}

              <button type="submit" className="next-button" disabled={formData.careers.length < 1}>
                Finish
              </button>
            </form>
          </>
        )}
    </div>
  );
};

export default FormPage;