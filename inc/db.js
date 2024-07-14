
const mysql = require('mysql2');


const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  database: 'saboroso',
  password: '',
});

module.exports = connection;