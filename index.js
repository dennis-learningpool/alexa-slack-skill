module.change_code = 1;
'use strict';

const Alexa = require('alexa-app');
const Slack = require('slack-node');

var app = new Alexa.app('alexa-slack-skill');
var slack = new Slack();
slack.setWebhook(process.env.SLACK_WEBHOOK_URI);

app.launch(function (req, res) {
	res.say('What would you like to post?').reprompt('I\'m sorry. Could you repeat that?').shouldEndSession(false);
});

app.error = function (err, req, res) {
	console.log(err);
	console.log(req);
	console.log(res);

	res.say('Sorry, an error occurred ' + err.message);
};

app.intent( 
	'PostToSlackIntent', {
		'slots': { 
			'message' : 'string'
		},
		'utterances': [
			'{message}'
		]
	},
	function (req, res) {
		var message = req.slot('message');
		slack.webhook({
			text: message
		}, function (err, slackRes) {
			if (err || slackRes.statusCode !== 200) {
				console.log(err, slackRes);
				return res.say('Sorry, there was an error.');
			}

			res.say('Your message was posted');
		});
	}	
);

module.exports = app;
