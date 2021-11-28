var mysql = require('mysql');
const { YEAR, VARCHAR } = require('mysql/lib/protocol/constants/types');

var con = mysql.createConnection({
        host: 'mysql1',
        user: 'root',
        database: 'project',
        password: 'admin'
});

// Connect to the database
con.connect(function (err) {
    if (err) console.log(err);
    console.log("Database Connected!");
});
module.exports = con;