import pool from '../config/db.js';  // Get db connection, with .js extension
import bcrypt from 'bcrypt';  // For password hashing

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
export const oauthLogin = async (profile, done) => {
  try {
    const email = profile.emails[0].value;  // Extract email from OAuth profile

    const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]); // Check if the user exists in the database

    if (result.rows.length === 0) {
      return done(null, false, { message: 'User not found' }); // If the user is not found, return an error (no user creation)
    }

    return done(null, result.rows[0]);  // If user exists, return the user data

  } catch (error) {
    console.error('Error during OAuth login:', error);
    return done(error, null);  // Handle error in OAuth flow
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
    // Convert `coursesDone` into PostgreSQL array format with each element properly quoted
    const coursesDoneArray = `{${coursesDone.split(',').map(course => `"${course.trim()}"`).join(',')}}`;

    // Ensure `coursesPerYear` is stored as JSON (since it's a nested object)
    const coursesPerYearJson = JSON.stringify(coursesPerYear);

    // Convert `careers` into PostgreSQL array format with proper quoting
    const careersArray = `{${careers.map(career => `"${career.trim()}"`).join(',')}}`;

    // Convert `summerTermAArray` into PostgreSQL array format with proper quoting
    const summerTermArray = `{${summerTerm.split(',').map(term => term.trim()).join(',')}}`;


    // Insert personal info into the database
    const result = await pool.query(
      `INSERT INTO personal_info (
        user_id, name, age, domestic_international, gender, current_student,
        year_in, major, courses_done, summer_term, courses_per_term, career_options
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12) RETURNING *`,
      [
        userId, name, age, studentType, gender, isCurrentStudent,
        yearIn, major, coursesDoneArray, summerTermArray, coursesPerYearJson, careersArray
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
