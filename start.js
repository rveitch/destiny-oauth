#!/usr/bin/env node
'use strict';

var express = require('express');
var request = require('request');
//var https = require('https'); // FOR LOCAL SSL ONLY
var fs = require('fs');
var sqlite3 = require('sqlite3').verbose();
//var program = require('commander');
var apiKey = require('./apiKey').getKey();
var authURL = require('./authURL').getAuthURL();
var app = express();
var port = Number(process.env.PORT || 3000);

app.set('json spaces', 2); // Set Express to pretty print json
//app.set('view engine', 'ejs'); // Set Express's view engine to EJS

var username, token, refreshToken;
var authState = 'test';

/******************** EXPRESS ROUTES ********************/

// Default Endpoint
app.get('/', function (req, res) {
	var baseURL = req.protocol + '://' + req.headers.host;
	var genericMessage = {
		name: 'Destiny oAuth - Home',
		url: baseURL,
		endpoints: {
			'/': baseURL + '/',
			'/signin': baseURL + '/signin',
			'/auth': baseURL + '/auth',
		}
	}
	res.json(genericMessage);
});

// Sign-In Endpoint
app.get('/signin', function (req, res) {
	res.redirect(302, 'https://www.bungie.net' + authURL + "?state="+ authState );
});

// Auth Redirect Endpoint
app.get('/auth', function (req, res) {
	console.log(req.query);

  var post_data = {
    code: req.query.code,
  }

	/*request({
		method: 'POST',
		uri: 'https://www.bungie.net/Platform/App/GetAccessTokensFromCode/',
	  headers: {
			'Host': 'www.bungie.net',
			'Accept': 'application/json',
			'Origin': req.protocol + '://' + req.headers.host,
			'User-Agent': 'app-platform',
			'Content-Length': post_data.toString().length,
	    'X-API-Key': apiKey,
      //'Content-Type': 'application/json; charset=UTF-8', // set by json parameter
	  },
		json: {
			'code': 'b36868244121de60c25a49f0c8ca7de9'
		},
	}, onRequestResponse);*/

	// generic function sending messages
	//function sendMessage(recipientId, message) {
	    request({
	        url: 'https://www.bungie.net/Platform/App/GetAccessTokensFromCode/',
	        //qs: { access_token: process.env.PAGE_ACCESS_TOKEN },
	        method: 'POST',
					headers: {
						'Host': 'www.bungie.net',
						'Accept': 'application/json',
						'Origin': req.protocol + '://' + req.headers.host,
						'User-Agent': 'app-platform',
						'Content-Length': post_data.toString().length,
				    'X-API-Key': apiKey,
			      //'Content-Type': 'application/json; charset=UTF-8', // set by json parameter
				  },
	        json: {
	            code: req.query.code,
	        }
	    }, function(error, response, body) {
	        if (error) {
	            console.log('Error sending message: ', error);
	        } else if (response.body.error) {
	            console.log('Error: ', response.body.error);
	        } else {
						console.log(response.body);
						res.json(parsedResponse);
					}
	    });
	//};

	/*function onRequestResponse(error, response, body) {
	  var parsedResponse = JSON.parse(body);
		console.log('parsedResponse:');
		console.log(parsedResponse);
		res.json(parsedResponse);
	}*/

  //post_data = JSON.stringify(post_data);
	//var baseURL = req.protocol + '://' + req.headers.host;
	/*var genericMessage = {
		name: 'Destiny oAuth - Authorization Redirect',
		url: baseURL
	}*/
	//res.json(post_data);
});

/******************************************************************************/

// Server Listen
app.listen(port, function () {
	console.log('API Key: ' + apiKey);
	console.log('Authorization URL: ' + authURL);
	console.log('App server is running on http://localhost:' + port);
});

/*** FOR LOCAL SSL ONLY ***/
/*
https.createServer({
  key: fs.readFileSync('ssl/key.pem'),
  cert: fs.readFileSync('ssl/cert.pem')
}, app).listen(port, function() {
  //db.serialize(function() {
    //db.run("CREATE TABLE token (username TEXT, token TEXT, refreshToken TEXT)");
  //});
	console.log('App server is running on https://localhost:' + port);
});*/
