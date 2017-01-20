module.change_code = 1;
'use strict';

const Alexa = require('alexa-app');
var app = new Alexa.app('alexa-slack-skill');

app.launch(function (req, res) {
	res.say('Testing').reprompt('Testing').shouldEndSession(false);
});

app.error = function (err, req, res) {
	console.log(err);
	console.log(req);
	console.log(res);

	res.say('Sorry, an error occurred ' + err.message);
};

app.intent( 
	'postToSlack', {
		'slots': { 
			'message' : 'string'
		},
		'utterances': [
			'{message}'
		]
	},
	function (req, res) {
		var message = req.slot('message');
		res.say(insult.replace('Posting your message to slack'));
	}	
);

module.exports = app;
