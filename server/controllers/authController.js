import pool from '../config/db.js';  // Get db connection, with .js extension
import bcrypt from 'bcrypt';  // For password hashing
import axios from 'axios'; // For github login

// Sign up function
export const signupUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const existingUser = await pool.query('SELECT * FROM users WHERE email = $1', [email]); // Check if user already exists
    if (existingUser.rows.length > 0) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);  // Hash password
    const newUser = await pool.query(
      'INSERT INTO users (email, password) VALUES ($1, $2) RETURNING *',
      [email, hashedPassword]
    );

    res.status(201).json({ message: 'User created', user: newUser.rows[0] });  // Success response
  } catch (error) {
    console.error('Error during signup:', error);
    res.status(500).json({ message: 'Server error' });  // Error response
  }
};

// Handle OAuth login for Google/GitHub
// OAuth login function
export const oauthLogin = async (profile, done, provider) => {
  try {
    let email = null;

    // Handle Google login or GitHub login with email
    if (provider === 'google') {
      email = profile.emails[0].value;  // Extract email from Google profile
    } else if (provider === 'github') {
      // Handle GitHub login and fetch email if not present in profile
      if (profile.emails && profile.emails.length > 0) {
        email = profile.emails[0].value;  // Use the first email if present
      } else {
        // GitHub sometimes does not include emails in the profile, so we fetch it from the API
        const accessToken = profile._json.access_token;  // Capture access token from GitHub strategy
        const emailResponse = await axios.get('https://api.github.com/user/emails', {
          headers: {
            Authorization: `token ${accessToken}`,
          },
        });
        const primaryEmail = emailResponse.data.find(e => e.primary && e.verified);
        email = primaryEmail ? primaryEmail.email : null;

        if (!email) {
          return done(null, false, { message: 'No verified email associated with this GitHub account.' });
        }
      }
    }

    const providerId = profile.id;  // Use profile.id for provider-specific user identification
    let result;

    // Check if user exists based on Google or GitHub ID, or by email
    if (provider === 'google') {
      result = await pool.query('SELECT * FROM users WHERE google_id = $1 OR email = $2', [providerId, email]);
    } else if (provider === 'github') {
      result = await pool.query('SELECT * FROM users WHERE github_id = $1 OR email = $2', [providerId, email]);
    }

    if (result.rows.length > 0) {
      const user = result.rows[0];

      // If user exists but doesn't have a provider ID, update the record with the provider ID
      if ((provider === 'google' && !user.google_id) || (provider === 'github' && !user.github_id)) {
        await pool.query(
          `UPDATE users SET ${provider}_id = $1 WHERE email = $2`,
          [providerId, email]
        );
      }

      // User exists, log them in
      return done(null, user);
    } else {
      // User doesn't exist, create a new user with provider ID and email
      const newUser = await pool.query(
        `INSERT INTO users (email, ${provider}_id) VALUES ($1, $2) RETURNING *`,
        [email, providerId]
      );
      return done(null, newUser.rows[0]);  // Log them in after creating the account
    }
  } catch (error) {
    return done(error);
  }
};


// Handle email login
export const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);  // Find user by email

    if (result.rows.length === 0) {
      return res.status(400).json({ message: 'User not found' }); // If user doesn't exist
    }

    const existingUser = result.rows[0]; // Get user data from the query result

    const isPasswordValid = await bcrypt.compare(password, existingUser.password); // Compare the provided password with the stored hashed password

    if (!isPasswordValid) {
      return res.status(400).json({ message: 'Invalid password' }); // If password is incorrect
    }

    return res.status(200).json({ message: 'Login successful', user: existingUser }); // Successful login

  } catch (error) {
    console.error('Error during login:', error);
    return res.status(500).json({ message: 'Server error', error });  // Error response
  }
};

// Handle update personal info into db
export const storePersonalInfo = async (req, res) => {
  const { userId } = req.params;
  const {
    name,
    age,
    studentType,
    gender,
    isCurrentStudent,
    yearIn,
    major,
    coursesDone,
    summerTerm,
    coursesPerYear,
    careers,
  } = req.body;

  try {
    // Handle null values for non-current students
    const yearInValue = isCurrentStudent ? yearIn : null;
    const majorValue = isCurrentStudent ? major : null;
    const coursesDoneArray = isCurrentStudent && coursesDone
      ? `{${coursesDone.split(',').map(course => course.trim()).join(',')}}`
      : '{}'; // Empty array if not a current student

    // Convert `coursesPerYear` and `careers` to proper PostgreSQL array format
    const coursesPerYearArray = JSON.stringify(coursesPerYear);  // Assuming it's an object
    const careersArray = `{${careers.map(career => career.trim()).join(',')}}`;

    // Fix for `summerTerm`: Convert to a text array (e.g., {"1"} for a single summer term)
    const summerTermArray = `{${summerTerm}}`; // Wrap in curly braces to make it a proper array literal

    // Insert personal info into the database
    const result = await pool.query(
      `INSERT INTO personal_info (
        user_id, name, age, domestic_international, gender, current_student,
        year_in, major, courses_done, summer_term, courses_per_term, career_options
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12) RETURNING *`,
      [
        userId, name, age, studentType, gender, isCurrentStudent,
        yearInValue, majorValue, coursesDoneArray, summerTermArray, coursesPerYearArray, careersArray
      ]
    );

    // Send the inserted data back as a response
    res.status(201).json({
      message: 'Personal info saved successfully',
      personalInfo: result.rows[0],
    });
  } catch (error) {
    console.error('Error saving personal info:', error);
    res.status(500).json({ message: 'Server error' });
  }
};
