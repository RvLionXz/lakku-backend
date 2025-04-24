const mysql = require('mysql2');
const fs = require('fs');

const db = mysql.createConnection({
  host: '',
  user: '',
  password: '',
  database: '',
  port: 19846,
  ssl: {
    ca: fs.readFileSync('ca.pem'),
    rejectUnauthorized: true
  }
});

db.connect((err) => {
  if (err) {
    console.error('Error connecting to the database:', err.stack);
    return;
  }
  console.log('Connected to the database');
});

module.exports = db;

