const bulk_unfollow_followers = () => {
  var settings = require('../settings');

  if (settings.BULK_UNFOLLOW_FOLLOWERS == 'ON') {
    console.log("The mass unfollowing bot is starting...");
    console.log("This bot will unfollow the people who have followed you back.");

    // Include all bots
    var unfollowFollower = require('./untouchables/churner_unfollowFollower');

    // Lights, Camera, Action
    unfollowFollower()
  }
}

module.exports = bulk_unfollow_followers;
