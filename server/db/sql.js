var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'wang1996',
  database : 'demo'
});

module.exports = connection;
