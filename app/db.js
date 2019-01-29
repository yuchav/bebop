var mysql = require('mysql');
var db = require('./config.js').mysql;

var pool = mysql.createPool({
  connectionLimit: 100,
  host: db.host,
  user: db.user,
  password: db.password,
  database: db.database
});

module.exports = pool;
