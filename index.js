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
			'name' : 'string',
	   		'insult' : 'string'	
		},
		'utterances': [
			'Tell {name} he\'s a {insult}',
			'Tell {name} he\'s an {insult}',
			'Tell {name} she\'s a {insult}',
			'Tell {name} she\'s an {insult}',
			'Call {name} a {insult}',
			'Call {name} an {insult}'
		]
	},
	function (req, res) {
		var name = req.slot('name');
		var insult = req.slot('insult');
		res.say(name + ', you\'re a ' + insult);
	}	
);

module.exports = app;
