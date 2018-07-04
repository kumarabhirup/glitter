const engager = () => {
  console.log("The engager bot is starting...");
  var settings = require('../settings');

  // Include all bots
  var streamer = require('./untouchables/streamer');
  var promote_byTweet = require('./untouchables/promote_byTweet');
  var stream_follow = require('./untouchables/stream_follow');
  var everydayTrender = require('./untouchables/everydayTrender');

  // Lights, Camera, Action
  streamer()
  promote_byTweet()
  stream_follow()
  everydayTrender()
}

module.exports = engager;
