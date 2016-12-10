var colors = require('colors');
var authURL = '/en/Application/Authorize/11057'; // NOTE: <-- Add your Authorization URL here.

module.exports = {
  getAuthURL: function() {
		if (authURL) {
			return authURL;
		} else {
			console.log('ERROR: '.red + 'Missing or invalid Authorization URL key in authURL.js');
			return;
		}
  }
};
