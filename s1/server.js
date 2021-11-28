'use strict';

const fs = require('fs');

const bodyParser = require("body-parser");
//app.use(bodyParser.urlencoded({ extended: true }));





const PORT = 8080;
const HOST = '0.0.0.0';

var sortBy = '';
var sortOrder = '';

var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
;
var app = express();

// view engine setup
app.use('/', indexRouter);
app.use('/users', usersRouter);



app.set('views', path.join(__dirname, 'views'));

app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;

app.post('/sayHello', (req, res) => {
        var topic = req.body.topic;
        var data = req.body.data;
        postmesage(topic, data);

        var response = new Object();
        select(function (result) {
                response.answer = result;
                res.send(JSON.stringify(response));
        });

        let date_ob = new Date();
});

app.get('/init', (req, res) => {
        var response = new Object();
        if (sortBy != '' && sortOrder != '') {
                sort(sortBy, sortOrder, function (result) {
                        response.answer = result;
                        res.send(JSON.stringify(response));
                });
        }
        else {
                select(function (result) {
                        response.answer = result;
                        res.send(JSON.stringify(response));
                });
        }
});

app.put('/sortTable', (req, res) => {
        sortBy = req.body.sortBy;
        sortOrder = req.body.sortOrder;
});


function postmesage(topic, data) {
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
                insert(topic, data, timeStamp);
        }
}

function insert(topic, data, timestamp) {
        var sql = "INSERT INTO posts (topic, data, timestamp) VALUES ('" + topic + "', '" + data + "', STR_TO_DATE('" + timestamp + "', '%c/%e/%Y %H:%i:%s'))";
        con.query(sql, function (err, result) {
                if (err) throw err;
        });
}

function select(callBack) {
        var sql = 'SELECT * FROM posts';
        con.query(sql, function (err, result) {
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
        var sql = 'SELECT * FROM posts ORDER BY ' + sortBy + " " + order;
        con.query(sql, function (err, result) {
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


app.use('/', express.static('pages'));
console.log('up and running');


app.listen(PORT, HOST);
