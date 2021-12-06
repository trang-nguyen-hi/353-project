const { json } = require('express');
var express = require('express');
var router = express.Router();
var db = require('../database');
// another routes also appear here
// this script to fetch data from MySQL databse table
router.get('/user-list', function (req, res, next) {
    var sql = 'SELECT * FROM users';
    db.query(sql, function (err, data, fields) {
        if (err) throw err;
        res.send(JSON.stringify(data));
    });
});

router.get('/delete/:id', function (req, res, next) {
    // delete all the records of that user
    var id = req.params.id;
    var sql = 'DELETE FROM reports WHERE userID = ?';
    db.query(sql, [id], function (err, data) {
        if (err) throw err;
        console.log(data.affectedRows + " record(s) updated");
    });

    sql = 'DELETE FROM users WHERE id = ?';
    db.query(sql, [id], function (err, data) {
        if (err) throw err;
        console.log(data.affectedRows + " record(s) updated");
    });
    res.redirect('/users/user-list');

});

router.get('/edit/:id', function (req, res, next) {
    var UserId = req.params.id;
    var sql = `SELECT * FROM users WHERE id=${UserId}`;
    db.query(sql, function (err, data) {
        if (err) throw err;
        res.send(JSON.stringify(data[0]));
    });
});

router.post('/edit', function (req, res, next) {
    var userDetails = req.body;
    var id = parseInt(req.body.id);
    var sql = 'UPDATE users SET firstName=' + "'" + userDetails.firstName +  "'" + ","
                                +"lastName="  + "'" + userDetails.lastName +  "'" + ","
                                + "phoneNumber=" + "'" + userDetails.phoneNumber +  "'" + ","
                                + "location=" + "'" + userDetails.location +  "'"
                                + " WHERE id = " + id;
    console.log(sql);
    db.query(sql, function (err, data) {
        if (err) throw err;
        console.log(data.affectedRows + " record(s) updated");
        res.send(JSON.stringify(true));
    });
});

router.post('/create', function (req, res, next) {

    // store all the user input data
    const userDetails = req.body;

    // insert user data into users table
    var sql = 'INSERT INTO users (firstName, lastName, phoneNumber, location) values(' + "'" + userDetails.firstName +  "'" + ","
                                                                                        + "'" + userDetails.lastName +  "'" + ","
                                                                                        + "'" + userDetails.phoneNumber +  "'" + ","
                                                                                        + "'" + userDetails.location +  "'"
                                                                                        + ")";
    db.query(sql, userDetails, function (err, data) {
        if (err) throw err;
        console.log("User data is inserted successfully ");
        res.send(JSON.stringify(true));
    });
});

router.get('/reports/:id', function (req, res, next) {
    res.render('report', { title: req.params.id });
});

router.post('/reports/:id/sayHello', (req, res) => {
    var userID = req.params.id;
    var topic = req.body.topic;
    var data = req.body.data;
    postmesage(userID, topic, data);

    var response = new Object();
    select(userID, function (result) {
            response.answer = result;
            res.send(JSON.stringify(response));
    });

    let date_ob = new Date();
});

var sortBy = '';
var sortOrder = '';

router.get('/reports/:id/init', (req, res) => {
    var userID = req.params.id;
    var response = new Object();
    if (sortBy != '' && sortOrder != '') {
            sort(sortBy, sortOrder, function (result) {
                    response.answer = result;
                    res.send(JSON.stringify(response));
            });
    }
    else {
            select(userID, function (result) {
                    response.answer = result;
                    res.send(JSON.stringify(response));
            });
    }
});

router.put('/reports/:id/sortTable', (req, res) => {
    sortBy = req.body.sortBy;
    sortOrder = req.body.sortOrder;
});


function postmesage(id, topic, data) {
    if (topic == "" && data == "") {
            return;
    }
    else {

            let date_ob = new Date();
            // current date
            let date = ("0" + date_ob.getDate()).slice(-2);
            // current month
            let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
            // current year
            let year = date_ob.getFullYear();
            // current hours
            let hours = date_ob.getHours();
            // current minutes
            let minutes = date_ob.getMinutes();
            // current seconds
            let seconds = date_ob.getSeconds();
            // prints date & time in MM-DD-YYYY HH:MM:SS format
            let timeStamp = month + "/" + date + "/" + year + " " + hours + ":" + minutes + ":" + seconds;
            insert(id, topic, data, timeStamp);
    }
}

function insert(id, topic, data, timestamp) {
    var sql = "INSERT INTO reports (userID, topic, data, timestamp) VALUES (" + id + ",'" + topic + "', '" + data + "', STR_TO_DATE('" + timestamp + "', '%c/%e/%Y %H:%i:%s'))";
    db.query(sql, function (err, result) {
            if (err) throw err;
    });
}

function select(id, callBack) {
    var sql = 'SELECT * FROM reports where userID = ' + id;
    db.query(sql, function (err, result) {
            if (err) throw err;
            var table_value = "";
            Object.keys(result).forEach(function (key) {
                    var row = result[key];
                    table_value += "Topic: " + row.topic + "\n"
                            + "Data: " + row.data + "\n"
                            + "Timestamp: " + row.timestamp + "\n\n";
            });
            if (callBack) return callBack(table_value);
    });
}

function sort(sortBy, order, callBack) {
    var sql = 'SELECT * FROM reports ORDER BY ' + sortBy + " " + order;
    db.query(sql, function (err, result) {
            if (err) throw err;
            var table_value = "";
            Object.keys(result).forEach(function (key) {
                    var row = result[key];
                    table_value += "Topic: " + row.topic + "\n"
                            + "Data: " + row.data + "\n"
                            + "Timestamp: " + row.timestamp + "\n\n";
            });
            if (callBack) return callBack(table_value);
    });
}


router.route('/reports')
    .get(function (req, res) {

    })
    .post(function (req, res) {

    })
    .put(function (req, res) {
        var query = "INSERT INTO reports (customerID, staffID, time, requestType, requestState, notes) VALUES ("
            + "'" + req.body.customerID + "',"
            + "'" + req.body.staffID + "',"
            + "'" + req.body.time + "',"
            + "'" + req.body.requestType + "'"
            + "'" + req.body.requestState + "'"
            + "'" + req.body.notes + "'"
            + ";";
        con.query(query, function (err, result) { if (err) throw err; });

    });


module.exports = router;