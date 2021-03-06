'use strict';

var util = require('util');
var express = require('express');
var bodyParser = require('body-parser');
var app = express();

//outputs all requests to console
app.use(function(req,res,next){
    util.log(req.url);

    next();
});

//fake http calls used until real backend is up
app.use(bodyParser.json());//body parser

app.post('/login',function(req,res){
    res.send(200).end();
});

app.get('/testItems',function(req,res){
    var fakeItems = [
        {
            title:'Slush'
        },{
            title:'Packing Snow'
        },{
            title:'Dirty Snow'
        },{
            title:'Yellow Snow'
        },{
            title:'Fresh Snow'
        },{
            title:'Frozen Snow'
        },{
            title:'Freezer Snow'
        },{
            title:'Fluffy Snow'
        },{
            title:'SnowBalls'
        },{
            title:'Ice'
        },{
            title:'Black Ice'
        }
    ];
    var count = 0;

    //add random price and quantity
    for(var x in fakeItems){
        if(fakeItems.hasOwnProperty(x)){
            var price = Math.random() * 100;//limit price between 0 and 100
            var quantity = Math.round(Math.random() * 20);//limit quantity between 0 and 20, and round to whole number

            fakeItems[x].price = price;
            fakeItems[x].quantity = quantity;
            fakeItems[x].id = count;

            count++;
        }
    }

    res.status(200).send(fakeItems);
});

app.post('/shoppingCart',function(req,res){
    res.send(200).end();
});

app.get('/shoppingCart',function(req,res){
    var data = [];
    var num = Math.round(Math.random()*10);

    while(num){
        data.push({id:num});
        num--;
    }

    res.send(data).end();
});

app.post('/users',function(req,res){
    console.log(req.body);

    res.sendStatus(200);
});

app.use(express.static(__dirname + '/code'));

//starts server on port 5000
app.listen(5000);
console.log('Server started on port 5000');