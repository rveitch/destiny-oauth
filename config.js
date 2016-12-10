var colors = require('colors');

var configSettings = {
	apiKey: '75a448e1993446649bd167734701b515',  // <-- Add your Bungie API Key here.
	authURL: 'https://www.bungie.net/en/Application/Authorize/11057', // <-- Add your Authorization URL here.
	originHeader: 'https://destiny-oauth.herokuapp.com/', // <-- Add your origin header value here.
}

module.exports = {
  getConfig: function() {
		if (configSettings) {
			return configSettings;
		} else {
			console.log('ERROR: '.red + 'Missing or invalid settings in config.js');
			return;
		}
  }
};
