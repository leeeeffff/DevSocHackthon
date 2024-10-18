import pkg from 'pg';  // Import the entire pg package
import 'dotenv/config';  // Load environment variables using ES module syntax

const { Pool } = pkg;  // Destructure Pool from the pg package

// Connect to the PostgreSQL database
const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASS,
    port: process.env.DB_PORT,
});

// Export the pool instance for use in other modules
export default pool;
