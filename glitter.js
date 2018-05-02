console.log('Bot is starting...');

var Twit = require('twit');
var config = require('./config'); // Find config.js in same folder

var T = new Twit(config);

T.get('followers/list', {screen_name:'kumar_abhirup', count:10000}, function (err, data, response) {
  console.log(data)
})
