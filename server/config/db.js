// connection to PostgreSQL db

const { Pool } = require('pg');
require('dotenv').config(); // load env variables


// connect to db
const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASS,
    port: process.env.DB_PORT,
});

// export pool //
module.exports = pool;

