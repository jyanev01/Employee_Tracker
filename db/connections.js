const mysql = require('mysql2');
const dotenv = require('dotenv').config();

const db = mysql.createConnection(
    {
    host: 'localhost',
    user: 'root',
    password: process.env.DB_PASSWORD,
    database: 'Employee_tracker_db'
    },
    console.log("Connected to the employee database.")
);

module.exports = db;