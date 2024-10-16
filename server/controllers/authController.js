const pool = require('../config/db'); // get db
const bcrypt = require('bcrypt'); // for pass hashing

const signupUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const existingUser = await pool.query('SELECT * FROM users WHERE email = $1', [email]); // check if existing user
    console.log(existingUser);
    if (existingUser.rows.length > 0) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10); // encrypt pass
    const newUser = await pool.query( // input new user
      'INSERT INTO users (email, password) VALUES ($1, $2) RETURNING *',
      [email, hashedPassword]
    );

    res.status(201).json({ message: 'User created', user: newUser.rows[0] }); // success
  } catch (error) {
    res.status(500).json({ message: 'Server error' }); // fail
  }
};

module.exports = { signupUser };
