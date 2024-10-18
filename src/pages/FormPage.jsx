import React, { useState } from 'react';
import '../style/FormPage.css';
import Nav from '../components/Signnav';

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
    },
    careers: [], // Step 3 career choices
  });

  const [currentStep, setCurrentStep] = useState(1);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
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
    <div>
      <Nav />
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

            <p className="form-label">What type of student are you?</p>
            <div className="button-group">
              <button
                type="button"
                className={`student-type-button ${formData.studentType === 'domestic' ? 'active' : ''}`}
                onClick={() => setFormData({ ...formData, studentType: 'domestic' })}
              >
                Domestic
              </button>
              <button
                type="button"
                className={`student-type-button ${formData.studentType === 'international' ? 'active' : ''}`}
                onClick={() => setFormData({ ...formData, studentType: 'international' })}
              >
                International
              </button>
            </div>

            <label htmlFor="gender">Gender</label>
            <select
              id="gender"
              name="gender"
              value={formData.gender}
              onChange={handleInputChange}
              required
            >
              <option value="" disabled>Select your gender</option> {/* Placeholder option */}
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="others">Others</option>
            </select>

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

            <p className="form-label">Are you a current student?</p>
            <div className="button-group">
              <button
                type="button"
                className={`student-type-button ${formData.isCurrentStudent === true ? 'active' : ''}`}
                onClick={() => setFormData({ ...formData, isCurrentStudent: true })}
              >
                Yes
              </button>
              <button
                type="button"
                className={`student-type-button ${formData.isCurrentStudent === false ? 'active' : ''}`}
                onClick={() => setFormData({ ...formData, isCurrentStudent: false })}
              >
                No
              </button>
            </div>

            {formData.isCurrentStudent && (
              <>
                <p className="form-label">What year are you in?</p>
                <div className="button-group">
                  {[1, 2, 3, 4].map((year) => (
                    <button
                      key={year}
                      type="button"
                      className={`student-type-button ${formData.yearIn === year.toString() ? 'active' : ''}`}
                      onClick={() => setFormData({ ...formData, yearIn: year.toString() })}
                    >
                      {year}
                    </button>
                  ))}
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

            <p className="form-label">Click on the years you are planning to do summer term</p>
            <div className="button-group">
              {[1, 2, 3, 4].map((year) => (
                <button
                  key={year}
                  type="button"
                  className={`student-type-button ${formData.summerTerm === year.toString() ? 'active' : ''}`}
                  onClick={() => setFormData({ ...formData, summerTerm: year.toString() })}
                >
                  {year}
                </button>
              ))}
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
            <p className="form-label">
              What career are you looking into? (Choose up to 3, minimum 1).
            </p>
            <div className="career-button-group">
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
                <button
                  key={career}
                  type="button"
                  className={`career-button ${formData.careers.includes(career) ? 'active' : ''}`}
                  onClick={() => {
                    let updatedCareers = [...formData.careers];
                    if (updatedCareers.includes(career)) {
                      updatedCareers = updatedCareers.filter((selectedCareer) => selectedCareer !== career);
                    } else if (updatedCareers.length < 3) {
                      updatedCareers.push(career);
                    }
                    setFormData({ ...formData, careers: updatedCareers });
                  }}
                  disabled={formData.careers.length >= 3 && !formData.careers.includes(career)}
                >
                  {career}
                </button>
              ))}
            </div>

            <button type="submit" className="next-button" disabled={formData.careers.length < 1}>
              Finish
            </button>
          </form>
        </>
      )}
    </div>
    </div>
  );
};
export default FormPage;
