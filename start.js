'use strict';

var express = require('express');
var favicon = require('serve-favicon');
var request = require('request');
var sqlite3 = require('sqlite3').verbose();
var colors = require('colors');

var app = express();
app.set('json spaces', 2); // Set Express to pretty print json
app.use(favicon(__dirname + '/public/favicon.ico'));
var port = Number(process.env.PORT || 3000);

var config = require('./config').getConfig();
var apiKey = config.apiKey;
var authURL = config.authURL;
var originHeader = config.originHeader;
var username, token, refreshToken;
var authState = 'test';

/******************************* EXPRESS ROUTES *******************************/

// Default Endpoint
app.get('/', function(req, res) {
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

// Sign-In Endpoint (for Bungie Redirect)
app.get('/signin', function(req, res) {
  res.redirect(302, authURL + "?state=" + authState);
});

// Auth Redirect Endpoint
app.get('/auth', function(req, res) {
  if (req.query.code) {

    var responseCode = {
      code: req.query.code,
    }

    request({
      url: 'https://www.bungie.net/Platform/App/GetAccessTokensFromCode/',
      method: 'POST',
      headers: {
        'Host': 'www.bungie.net',
        'Origin': originHeader,
        'X-API-Key': apiKey,
      },
      json: {
        code: req.query.code
      },
    }, function(error, response, body) {
      if (error) {
        console.log('Error sending message: ', error);
      } else if (response.body.error) {
        console.log('Error: ', response.body.error);
      } else {
        console.log(response.body);
        res.json(body);
      }
    });

  } else {
    res.json({
      req.query
    });
  }
});

/******************************************************************************/

// Server Listen
app.listen(port, function() {
  console.log('\nAPI Key: '.cyan + apiKey);
  console.log('Authorization URL: '.cyan + authURL);
  console.log('Origin Header: '.cyan + originHeader);
  console.log('App server is running on ' + 'http://localhost:'.green + port.toString().green + '\n');
});
