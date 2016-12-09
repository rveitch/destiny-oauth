#!/usr/bin/env node
'use strict';

var express = require('express');
var request = require('request');


//var fs = require('fs');
//var sqlite3 = require('sqlite3').verbose();
//var program = require('commander');
var apiKey = require('./apiKey').getKey();
console.log('API Key: ' + apiKey);

var app = express();
var port = Number(process.env.PORT || 3000);

app.set('json spaces', 2); // Set Express to pretty print json
//app.set('view engine', 'ejs'); // Set Express's view engine to EJS

/******************** EXPRESS ROUTES ********************/

// Default Endpoint
app.get('/', function (req, res) {
	var baseURL = req.protocol + '://' + req.headers.host;
	var genericMessage = {
		name: 'Destiny oAuth - Home',
		url: baseURL,
	}
	res.json(genericMessage);
});

// Default Endpoint
app.get('/auth', function (req, res) {
	console.log(req.query);
	//var baseURL = req.protocol + '://' + req.headers.host;
	/*var genericMessage = {
		name: 'Destiny oAuth - Authorization Redirect',
		url: baseURL
	}*/
	res.json(req.query);
});

/******************************************************************************/

// Server Listen
app.listen(port, function () {
	console.log('App server is running on http://localhost:' + port);
});
