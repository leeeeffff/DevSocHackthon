import React, { useState } from 'react';
import '../style/Settings.css';

const Settings = () => {
  const [theme, setTheme] = useState('light');
  const [language, setLanguage] = useState('English');

  const handleThemeChange = (e) => {
    setTheme(e.target.value);
    document.body.setAttribute('data-theme', e.target.value); // Example of how you could apply the theme globally
  };

  const handleLanguageChange = (e) => {
    setLanguage(e.target.value);
  };

  return (
    <div className="settings-page">
      <h2>Settings⚙️</h2>

      <div className="settings-option">
        <label htmlFor="theme-select">Choose Theme:</label>
        <select id="theme-select" value={theme} onChange={handleThemeChange}>
          <option value="light">Light</option>
          <option value="dark">Dark</option>
          <option value="system">System Default</option>
        </select>
      </div>

      <div className="settings-option">
        <label htmlFor="language-select">Choose Language:</label>
        <select id="language-select" value={language} onChange={handleLanguageChange}>
          <option value="English">English</option>
          <option value="Spanish">Spanish</option>
          <option value="French">French</option>
          <option value="German">German</option>
          <option value="Chinese">Chinese</option>
        </select>
      </div>
    </div>
  );
};

export default Settings;