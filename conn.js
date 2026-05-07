var mysql = require("mysql");
var util = require("util");
var conn = mysql.createConnection({
   host:"bjtrxolvxasictsolc1x-mysql.services.clever-cloud.com",
   user:"uvujqxojf3tdrlr4",
   password:"hwMTCa8Z3iLX1nNuXUvs",
   database:"bjtrxolvxasictsolc1x" 
});
 var exe = util.promisify(conn.query).bind(conn);

 module.exports = exe;