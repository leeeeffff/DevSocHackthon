import React, { useState } from 'react';
import '../style/Settings.css'; // Link to your CSS file

const Settings = () => {
  const [formData, setFormData] = useState({
    fullName: 'John Doe',
    email: 'johndoe123@gmail.com',
    password: '',
    emailNotifications: 'Enabled',
    smsNotifications: 'Enabled',
    theme: 'light'
  });

  const [isEditing, setIsEditing] = useState(false);

  // Handle input change for the form fields
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle theme change (light or dark mode)
  const handleThemeChange = (e) => {
    const { value } = e.target;
    setFormData({
      ...formData,
      theme: value,
    });
  };

  // Toggle editing mode for the form
  const toggleEditing = () => {
    setIsEditing(!isEditing);
  };

  return (
    <div className={`settings-page ${formData.theme === 'dark' ? 'dark-theme' : ''}`}>
      <h1 className="settings-title">Settings</h1>

      {/* Account Settings Section */}
      <div className="settings-section">
        <h2>Account Settings</h2>
        <div className="form-group">
          <label>Full Name</label>
          <input
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={handleInputChange}
            disabled={!isEditing}
          />
        </div>
        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            disabled={!isEditing}
          />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            name="password"
            placeholder="********"
            onChange={handleInputChange}
            disabled={!isEditing}
          />
        </div>
        <button className="save-button" onClick={toggleEditing}>
          {isEditing ? 'Save Changes' : 'Edit'}
        </button>
      </div>

      {/* Notifications Section */}
      <div className="settings-section">
        <h2>Notifications</h2>
        <div className="form-group">
          <label>Email Notifications</label>
          <select
            name="emailNotifications"
            value={formData.emailNotifications}
            onChange={handleInputChange}
            disabled={!isEditing}
          >
            <option value="Enabled">Enabled</option>
            <option value="Disabled">Disabled</option>
          </select>
        </div>
        <div className="form-group">
          <label>SMS Notifications</label>
          <select
            name="smsNotifications"
            value={formData.smsNotifications}
            onChange={handleInputChange}
            disabled={!isEditing}
          >
            <option value="Enabled">Enabled</option>
            <option value="Disabled">Disabled</option>
          </select>
        </div>
        <button className="save-button">Update Notifications</button>
      </div>

      {/* Theme Section */}
      <div className="settings-section">
        <h2>Theme</h2>
        <div className="theme-options">
          <label>
            <input
              type="radio"
              name="theme"
              value="light"
              checked={formData.theme === 'light'}
              onChange={handleThemeChange}
            />
            Light Mode
          </label>
          <label>
            <input
              type="radio"
              name="theme"
              value="dark"
              checked={formData.theme === 'dark'}
              onChange={handleThemeChange}
            />
            Dark Mode
          </label>
        </div>
        <button className="save-button">Apply Theme</button>
      </div>
    </div>
  );
};

export default Settings;