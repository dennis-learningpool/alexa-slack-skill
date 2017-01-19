module.change_code = 1;
'use strict';

const Alexa = require('alexa-app');
var app = new Alexa.app('alexa-slack-skill');

app.launch(function (req, res) {
	res.say('This is a test skill').reprompt('Fucking A').shouldEndSession(false);
});

app.error = function (err, req, res) {
	console.log(err);
	console.log(req);
	console.log(res);

	res.say('Sorry, an error ' + err.message);
};

app.intent( 
	'sayNumber', {
		'slots': { 
			'number' : 'NUMBER' 
		},
		'utterances': [
			'say the number {1-100|number}',
			'give me the number {1-100|number}',
			'tell me the number {1-100|number}',
			'I want to hear you say the number {1-100|number}'
		]
	},
	function (req, res) {
		var number = req.slot('number');
		res.say('You asked for the number ' + number);
	}	
);

module.exports = app;
