const pool = require('../config/db'); // get database connection pool

// handle login (email login)

const loginUser = async (req, res) => {
    const { email } = req.body; // get email from req body
    try {
        // check if user exists in db
        const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);

        // make new user if doesnt exist
        if (result.rows.length === 0) {
            const newUser = await pool.query(
                'INSERT INTO users (email) VALUES ($1) RETURNING *',
                [email]
            );
            return res.status(200).json({ message: 'User created', user: newUser.rows[0] });
        }
        else {
            //if user exists, return details
            const existingUser = result.rows[0];
            return res.status(200).json({ message: 'User exists', user: existingUser });
        }
    }
    catch(error) {
        console.error('Error during login', error);
        return res.status(500).json({ message: 'Server error', error });
    }
};

module.exports = { loginUser };


