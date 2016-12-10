var colors = require('colors');
var apikey = '75a448e1993446649bd167734701b515'; // NOTE: <-- Add your Bungie API Key here.

module.exports = {
  getKey: function() {
		if (apikey) {
			return apikey;
		} else {
			console.log('ERROR: '.red + 'Missing or invalid API key in apiKey.js');
			return;
		}
  }
};
