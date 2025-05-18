const mysql = require('mysql2');
const fs = require('fs');

const pool = mysql.createPool({
  host: '',
  user: '',
  password: '',
  database: '',
  port: '',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  ssl: {
    ca: fs.readFileSync('ca.pem'),
    rejectUnauthorized: true
  }
});

module.exports = pool;
