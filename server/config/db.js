// connection to PostgreSQL db

import pkg from 'pg'; // Import the entire package
import 'dotenv/config'; // ES module style import for dotenv

const { Pool } = pkg; // Destructure Pool from the package

// connect to db
const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASS,
    port: process.env.DB_PORT,
});

// export pool
export default pool;
