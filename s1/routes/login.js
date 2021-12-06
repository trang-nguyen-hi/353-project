
const { json } = require('express');
var express = require('express');
var router = express.Router();
var connection = require('../database');
var path = require('path');

var session = require('express-session');
var flash = require('express-flash');
var bodyParser = require('body-parser');
var path = require('path');

router.use(session({
	secret: 'secret',
	resave: true,
	saveUninitialized: true
}));
router.use(bodyParser.urlencoded({extended : true}));
router.use(bodyParser.json());


router.get('/', function(request, response) {
	response.sendFile('/usr/src/app/pages/login.html');
});

router.post('/auth', function(request, response) {
	var username = request.body.username;
	var password = request.body.password;
	if (username && password) {
		connection.query('SELECT * FROM staffs WHERE username = ? AND password = ?', [username, password], function(error, results, fields) {
			if (results.length > 0) {
				request.session.loggedin = true;
				request.session.username = username;
				request.session.role = results[0].roleID;
				response.redirect('/login/home');
                
			} else {
				response.send('Incorrect Username and/or Password!');
			}			
			response.end();
		});
	} else {
		response.send('Please enter Username and Password!');
		response.end();
	}
});

router.get('/home', function(request, response) {
	if (request.session.loggedin) {
		if (request.session.role == 1){
			response.redirect('/manager-home.html');
		}
		else{
        	response.redirect('/staff-home.html');
		}
		// response.send('Welcome back, ' + request.session.username + '!');
	} else {
		response.send('Please login to view this page!');
	}
});

// router.get('/user-list.html', function(request, response) {
// 	response.sendFile('/usr/src/app/pages/user-list.html');
// });

// router.get('/staff-list.html', function(request, response) {
// 	response.sendFile('/usr/src/app/pages/staff-list.html');
// });

// router.get('/users/reports/:id', function (req, res, next) {
//     res.render('report', { title: req.params.id });
// });

router.use(flash());
// Logout user
router.get('/logout', function (req, res) {
	
	req.flash('success', 'Login Again Here');
	req.session.destroy();
	res.redirect('/login');
	});

module.exports = router;
