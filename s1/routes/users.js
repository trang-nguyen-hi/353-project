var express = require('express');
var router = express.Router();
var db = require('../database');
// another routes also appear here
// this script to fetch data from MySQL databse table
router.get('/user-list', function (req, res, next) {
    var sql = 'SELECT * FROM users';
    db.query(sql, function (err, data, fields) {
        if (err) throw err;
        res.render('user-list', { title: 'User List', userData: data });
        // res.send(JSON.stringify(data));
    });
});

router.get('/delete/:id', function (req, res, next) {
    var id = req.params.id;
    var sql = 'DELETE FROM users WHERE id = ?';
    db.query(sql, [id], function (err, data) {
        if (err) throw err;
        console.log(data.affectedRows + " record(s) updated");
    });
    res.redirect('/users/user-list');

});

router.get('/edit/:id', function (req, res, next) {
    var UserId = req.params.id;
    console.log(UserId);
    var sql = `SELECT * FROM users WHERE id=${UserId}`;
    db.query(sql, function (err, data) {
        if (err) throw err;

        res.render('users-form', { title: 'User List', editData: data[0] });
        console.log(data);
    });
});

router.post('/edit/:id', function (req, res, next) {
    console.log(req);
    var id = req.params.id;
    var updateData = req.body;
    var sql = `UPDATE users SET ? WHERE id= ?`;
    db.query(sql, [updateData, id], function (err, data) {
        if (err) throw err;
        console.log(data.affectedRows + " record(s) updated");
    });
    res.redirect('/users/user-list');
});

// router.get('/form', function (req, res, next) {
//     res.render('/users/user-form');
// });

router.post('/create', function (req, res, next) {

    // store all the user input data
    const userDetails = req.body;

    // insert user data into users table
    var sql = 'INSERT INTO users SET ?';
    db.query(sql, userDetails, function (err, data) {
        if (err) throw err;
        console.log("User data is inserted successfully ");
    });
    res.redirect('/users/user-list');  // redirect to user form page after inserting the data
});

router.route('/customer-list')
    .get(function (req, res) {
        var sql = "SELECT * FROM customers";
        con.query(sql, function (err, data, fields) {
            if (err) throw err;
            var response = new Object();
            response.answer = result;
            res.send(JSON.stringify(response));
            res.render('customer-list', { title: 'Customer List', userData: data });

        })
    })
    .post(function (req, res) {

    })
    // INSERT
    .put(function (req, res) {
        var query = "INSERT INTO customers (firstName, lastName, phoneNumber, location) VALUES ("
            + "'" + req.body.firstName + "',"
            + "'" + req.body.lastName + "',"
            + "'" + req.body.phoneNumber + "',"
            + "'" + req.body.location + "'"
            + ";";
        con.query(query, function (err, result) { if (err) throw err; });
    });

router.route('/staffs')
    .get(function (req, res) {
        // res.send()
    })
    .post(function (req, res) {

    })
    .put(function (req, res) {
        var query = "INSERT INTO staffs (roleID, firstName, lastName, phoneNumber) VALUES ("
            + "'" + req.body.roleID + "',"
            + "'" + req.body.firstName + "',"
            + "'" + req.body.lastName + "',"
            + "'" + req.body.phoneNumber + "'"
            + ";";
        con.query(query, function (err, result) { if (err) throw err; });
    });

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