import { query } from '../config/db'; // get database connection pool

// Handle OAuth login for Google/GitHub
const oauthLogin = async (profile, done) => {
    try {
        const email = profile.emails[0].value;
        const result = await query('SELECT * FROM users WHERE email = $1', [email]);

        if (result.rows.length === 0) {
            const newUser = await query(
                'INSERT INTO users (email, name, oauth_provider) VALUES ($1, $2, $3) RETURNING *',
                [email, profile.displayName, profile.provider]
            );
            return done(null, newUser.rows[0]);
        } else {
            return done(null, result.rows[0]);
        }
    } catch (error) {
        return done(error, null);
    }
};

// handle login (email login)

const loginUser = async (req, res) => {
    const { email } = req.body; // get email from req body
    try {
        // check if user exists in db
        const result = await query('SELECT * FROM users WHERE email = $1', [email]);

        // make new user if doesnt exist
        if (result.rows.length === 0) {
            const newUser = await query(
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

export default { oauthLogin, loginUser };


