const { json, Route } = require('express');
var express = require('express');
var router = express.Router();
var db = require('../database');
// another routes also appear here
// this script to fetch data from MySQL databse table
router.get('/', function (req, res, next) {
    res.sendFile('/usr/src/app/pages/register.html');
});

router.post('/', function (request, response) {
    var firstName = request.body.firstName;
    var lastName = request.body.lastName;
    var phoneNumber = request.body.phoneNumber;
    var roleID = 2;
    var username = request.body.username;
    var password = request.body.password;
    var sql = 'INSERT INTO staffs (username, password, roleID, firstName, lastName, phoneNumber) VALUES(?,?,?,?,?,?)'
    db.query(sql, [username, password, roleID, firstName, lastName, phoneNumber], function (error, results, fields) {
        if (err) throw err;
        response.redirect('/login/home');
    });
});

var session = require('express-session');
var bodyParser = require('body-parser');
var path = require('path');

router.use(session({
	secret: 'secret',
	resave: true,
	saveUninitialized: true
}));
router.use(bodyParser.urlencoded({extended : true}));
router.use(bodyParser.json());

router.post('/auth', function (request, response) {
    var firstName = request.body.firstName;
    var lastName = request.body.lastName;
    var phoneNumber = request.body.phoneNumber;
    var roleID = 2;
    var username = request.body.username;
    var password = request.body.password;
    var sql = 'INSERT INTO staffs (username, password, roleID, firstName, lastName, phoneNumber) VALUES(?,?,?,?,?,?)'
	db.query(sql, [username, password, roleID, firstName, lastName, phoneNumber], function(error, results, fields) {
        if (error) throw error;
				request.session.loggedin = true;
				request.session.username = username;
				response.redirect('/register/home');
        }
    );
});


router.get('/home', function(request, response) {
	if (request.session.loggedin) {
        response.redirect('/user-list.html');
		// response.send('Welcome back, ' + request.session.username + '!');
	} else {
		response.send('Please login to view this page!');
	}
});

module.exports = router;