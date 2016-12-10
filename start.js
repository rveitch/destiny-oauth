#!/usr/bin/env node
'use strict';

var express = require('express');
var request = require('request');


//var fs = require('fs');
//var sqlite3 = require('sqlite3').verbose();
//var program = require('commander');
var apiKey = require('./apiKey').getKey();
	console.log('API Key: ' + apiKey);
var authURL = require('./authURL').getAuthURL();
	console.log('Authorization URL: ' + authURL);

//Using request with https
//https://github.com/request/request/wiki/Using-request-with-https
var app = express();
var port = Number(process.env.PORT || 3000);

app.set('json spaces', 2); // Set Express to pretty print json
//app.set('view engine', 'ejs'); // Set Express's view engine to EJS

var username, token, refreshToken;

/******************** EXPRESS ROUTES ********************/

// Default Endpoint
app.get('/', function (req, res) {
	/*var baseURL = req.protocol + '://' + req.headers.host;
	var genericMessage = {
		name: 'Destiny oAuth - Home',
		url: baseURL,
	}*/
	res.redirect(302, 'https://www.bungie.net' + authURL + "?state=test");
	//res.json(genericMessage);
});

// Default Endpoint
app.get('/auth', function (req, res) {
	console.log(req.query);
	console.log(req.query.code);

	//https://destiny-oauth.herokuapp.com/auth?code=c0ccaa7563d07dd3caeedf76fa847dac&state=test
	//93c9842bccf74b47cd0f3920641ba057
	//var baseURL = req.protocol + '://' + req.headers.host;

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
		json: post_data,
		postData: {
			mimeType: 'application/x-www-form-urlencoded',
			params: [
				{
					name: 'foo',
					value: 'bar'
				},
				{
					name: 'hello',
					value: 'world'
				}
			]
		}
	}, onRequestResponse);

	function onRequestResponse(error, response, body) {
	  var parsedResponse = JSON.parse(body);
		console.log(parsedResponse);
		res.json(parsedResponse);
	}*/

  //post_data = JSON.stringify(post_data);
	//var baseURL = req.protocol + '://' + req.headers.host;
	/*var genericMessage = {
		name: 'Destiny oAuth - Authorization Redirect',
		url: baseURL
	}*/
	res.json(post_data);
});

/******************************************************************************/

// Server Listen
app.listen(port, function () {
	console.log('App server is running on http://localhost:' + port);
});
