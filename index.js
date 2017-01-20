module.change_code = 1;
'use strict';

const Alexa = require('alexa-app');
var app = new Alexa.app('alexa-slack-skill');

app.launch(function (req, res) {
	res.say('Who shall I insult?').reprompt('I should call who a what?').shouldEndSession(false);
});

app.error = function (err, req, res) {
	console.log(err);
	console.log(req);
	console.log(res);

	res.say('Sorry, an error occurred ' + err.message);
};

app.intent( 
	'sayInsult', {
		'slots': { 
			'name' : 'string'
		},
		'utterances': [
			'{name}'
		]
	},
	function (req, res) {
		var name = req.slot('name');
		var insults = process.env.INSULTS;
		if (!insults || 0 === insults.length) {
			insults = ['{name}, you\'re despicable.'];
		}

		var insult = insults[(Math.floor((Math.random() * insults.length) + 1))];
		res.say(insult.replace('{name}', name));
	}	
);

module.exports = app;
