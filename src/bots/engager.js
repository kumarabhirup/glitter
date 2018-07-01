console.log("The engager bot is starting...");

// Include all bots
var databaseConnect = require('./untouchables/databaseConnect').connect;
var streamer = require('./untouchables/streamer');
var promote_byTweet = require('./untouchables/promote_byTweet');
var stream_follow = require('./untouchables/stream_follow');
var everydayTrender = require('./untouchables/everydayTrender');

// Connect to the Firebase Database
databaseConnect()

// Lights, Camera, Action
streamer()
promote_byTweet()
stream_follow()
everydayTrender()
