const jsdom = require("jsdom");
const { JSDOM } = jsdom;

var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

// var React = require('react');
// var ReactDOM = require('react-dom');
// const con = require("../database");
// var reactElement = React.createElement('h1', { className: 'header' }, 'This is React');

// JSDOM.fromFile('/usr/src/app/pages/staff-home.html').then(function(dom) {
//     var window = dom.window;
//     global.document = window.document;
//     global.window = window;
//     console.log(document.getElementById('root'));
//     console.log(ReactDOM.render(reactElement, document.getElementById('root'), function(){
//       console.log("reactdom render returns");
//     })
//     );
//     console.log(document.getElementById('root'));
    
// });


module.exports = router;
