const mysql = require("mysql");
const dotenv = require("dotenv");

// Load environment variables
dotenv.config();

// Create a connection to the database
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT || 3306,
});

// Connect to MySQL
db.connect((error) => {
  if (error) throw error;
  console.log("Successfully connected to the database.");
});

module.exports = db;
