const { json } = require('express');
var express = require('express');
const con = require('../database');
var router = express.Router();
var db = require('../database');
// another routes also appear here
// this script to fetch data from MySQL databse table
router.get('/staff-list', function (req, res, next) {
    var sql = 'SELECT * FROM staffs';
    db.query(sql, function (err, data, fields) {
        if (err) throw err;
        data.forEach(entry => {
            if (entry.roleID == 1){
                entry.role = "Manager";
            }
            else if (entry.roleID == 2){
                entry.role = "Staff"
            }
        })
        res.send(JSON.stringify(data));
    });
});

router.get('/delete/:id', function (req, res, next) {
    var id = req.params.id;
    var sql = 'DELETE FROM staffs WHERE id = ?';
    db.query(sql, [id], function (err, data) {
        if (err) throw err;
        console.log(data.affectedRows + " record(s) updated");
    });
    res.redirect('/staffs/staff-list');

});

router.get('/edit/:id', function (req, res, next) {
    var UserId = req.params.id;
    var sql = `SELECT * FROM staffs WHERE id=${UserId}`;
    db.query(sql, function (err, data) {
        if (err) throw err;
        if (data[0].roleID == 1){
            data[0].role = "Manager";
        }
        else if (data[0].roleID == 2){
            data[0].role = "Staff"
        }
        res.send(JSON.stringify(data[0]));
    });
});

router.post('/edit', function (req, res, next) {
    var userDetails = req.body;
    var id = parseInt(req.body.id);
    if (req.body.role == "Manager"){
        var role = 1;
    }
    else if (req.body.role == "Staff"){
        var role = 2;
    }
    var sql = 'UPDATE staffs SET firstName=' + "'" + userDetails.firstName +  "'" + ","
                                +"lastName="  + "'" + userDetails.lastName +  "'" + ","
                                + "phoneNumber=" + "'" + userDetails.phoneNumber +  "'" + ","
                                + "roleID=" + role
                                + " WHERE id = " + id;
    db.query(sql, function (err, data) {
        if (err) throw err;
        console.log(data.affectedRows + " record(s) updated");
        res.send(JSON.stringify(true));
    });
});

// router.get('/form', function (req, res, next) {
//     res.render('/users/user-form');
// });

router.post('/create', function (req, res, next) {

    // store all the user input data
    const userDetails = req.body;
    if (req.body.role == "Manager"){
        var role = 1;
    }
    else if (req.body.role == "Staff"){
        var role = 2;
    }

    // insert user data into users table
    var sql = 'INSERT INTO staffs (firstName, lastName, phoneNumber, roleID) values(' + "'" + userDetails.firstName +  "'" + ","
                                                                                        + "'" + userDetails.lastName +  "'" + ","
                                                                                        + "'" + userDetails.phoneNumber +  "'" + ","
                                                                                        + role
                                                                                        + ")";
    db.query(sql, function (err, data) {
        if (err) throw err;
        console.log("Staff data is inserted successfully ");
        res.send(JSON.stringify(true));
    });
});


module.exports = router;