const bulk_follow = () => {
  var settings = require('../settings');

  if (settings.BULK_FOLLOW == 'ON') {
    console.log('The mass following bot is starting...');

    // Include all bots
    var follower = require('./untouchables/churner_follow');

    // Lights, Camera, Action
    follower()
  }
}

module.exports = bulk_follow;
