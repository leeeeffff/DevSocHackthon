import React, { useState } from 'react';
import '../style/FormPage.css'; 

const FormPage = () => {
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
    }
  });

  const [currentStep, setCurrentStep] = useState(1);

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

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form data:', formData);
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    } else {
      alert("All steps completed!");
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

            {/* Yearly course and term sliders */}
            <h2>How many courses are you planning to do each year?</h2>
            {[1, 2, 3, 4].map(year => (
              <div key={year} className="year-section">
                <h3>Year {year}</h3>
                {['T1', 'T2', 'T3', 'T0'].map(term => (
                  <div key={term} className="term-slider">
                    <label>{term}</label>
                    <input
                      type="range"
                      min={term === 'T0' ? 1 : 1}
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

      {currentStep === 3 && (
        <>
          <h1 className="title">Step 3 Placeholder</h1>
          <p>This is where you can add more content for Step 3.</p>
          <button className="next-button" onClick={() => alert('Form complete!')}>
            Finish
          </button>
        </>
      )}
    </div>
  );
};

export default FormPage;