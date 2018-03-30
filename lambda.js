var https = require('https');
var util = require('util');

exports.handler = function(event, context) {    
    let message = event.Records[0].Sns.Message;
    message = JSON.parse(message);
    let recipients = message.bounce.bouncedRecipients[0].emailAddress;
    let postData = {"channel": "#ampretailers", "username": "Bounce Alert", "text": "*Ampretailer*", "icon_emoji": ""};
    postData.attachments = [
        {
            "color":"#9C1A22" ,
            "text": "Bounced email id : "+recipients
        }
    ];

    let options = {
        method: 'POST',
        hostname: 'hooks.slack.com',
        port: 443,
        path: 'https://hooks.slack.com/services/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'
    };

    let req = https.request(options, function(res) {
        res.setEncoding('utf8');
        res.on('data', function (chunk) {
            context.done(null);
        });
    });

    req.on('error', function(e) {
      console.log('problem with request: ' + e.message);
    });

    req.write(util.format("%j", postData));
    req.end();
}