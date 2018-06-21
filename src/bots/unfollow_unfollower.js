console.log("The mass unfollowing bot is starting...");
console.log("This bot will unfollow the people who haven't followed you back.");

// Include all bots
var databaseConnect = require('./untouchables/databaseConnect').connect;
var unfollowUnfollower = require('./untouchables/churner_unfollowUnfollower');

// Connect to the Firebase Database
databaseConnect()

// Lights, Camera, Action
unfollowUnfollower()
