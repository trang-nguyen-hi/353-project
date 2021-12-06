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


const cron = require('node-cron')
const moment = require('moment')
const fs = require('fs')
const spawn = require('child_process').spawn

cron.schedule('0 0 * * *', () => {
  const fileName = `project_${moment().format('YYYY_MM_DD')}.sql`
  const wstream = fs.createWriteStream(`./dbDumps/${fileName}`)
  console.log('---------------------')
  console.log('Running Database Backup Cron Job')
  const mysqldump = spawn('mysqldump', [ '-u', 'root', '-p', 'admin', 'project' ])

  mysqldump
    .stdout
    .pipe(wstream)
    .on('finish', () => {
      console.log('DB Backup Completed!')
    })
    .on('error', (err) => {
      console.log(err)
    })
})


module.exports = con;