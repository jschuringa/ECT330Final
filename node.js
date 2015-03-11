'use strict';

var util = require('util');
var express = require('express');
var app = express();

//outputs all requests to console
app.use(function(req,res,next){
    util.log(req.url);

    next();
});

app.use(express.static(__dirname + '/code'));

//starts server on port 5000
app.listen(5000);
console.log('Server started on port 5000');