const mysql = require('mysql2');

// Connect to database
const db = mysql.createConnection(
    {
        host: 'localhost',
        // Your MySQL username,
        user: 'root',
        // Your MySQL password
        password: 'Richmond2!',
        database: 'employee tracker'
    },
    console.log('Connected to the employee tracker databse.')
);

module.exports = db;