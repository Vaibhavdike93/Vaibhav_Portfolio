var mysql = require("mysql");
var util = require("util");
var connectionConfig = process.env.MYSQL_URL
   ? process.env.MYSQL_URL
   : {
      host: process.env.MYSQL_HOST,
      user: process.env.MYSQL_USER,
      password: process.env.MYSQL_PASSWORD,
      database: process.env.MYSQL_DATABASE
   };

var conn = mysql.createConnection(connectionConfig);
var exe = util.promisify(conn.query).bind(conn);

module.exports = exe;
