console.log("The mass unfollowing bot is starting...");
console.log("This bot will unfollow the people who have followed you back.");

// Include all bots
var databaseConnect = require('./untouchables/databaseConnect').connect;
var unfollowFollower = require('./untouchables/churner_unfollowFollower');

// Connect to the Firebase Database
databaseConnect()

// Lights, Camera, Action
unfollowFollower()
