const bulk_unfollow_unfollowers = () => {
  var settings = require('../settings');

  if (settings.BULK_UNFOLLOW_UNFOLLOWERS == 'ON') {
    console.log("The mass unfollowing bot is starting...");
    console.log("This bot will unfollow the people who haven't followed you back.");

    // Include all bots
    var unfollowUnfollower = require('./untouchables/churner_unfollowUnfollower');

    // Lights, Camera, Action
    unfollowUnfollower()
  }
}

module.exports = bulk_unfollow_unfollowers;
