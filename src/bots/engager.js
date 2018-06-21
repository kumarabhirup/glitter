console.log("The engager bot is starting...");

// Include all bots
var databaseConnect = require('./untouchables/databaseConnect').connect;
var streamer = require('./untouchables/streamer');
var promote_byTweet = require('./untouchables/promote_byTweet');
var promote_byRetweet = require('./untouchables/promote_byRetweet');
var stream_follow = require('./untouchables/stream_follow');
var stream_mention = require('./untouchables/stream_mention');
var stream_dm = require('./untouchables/stream_dm');
var everydayTrender = require('./untouchables/everydayTrender');
var troll = require('./untouchables/troller');

// Connect to the Firebase Database
databaseConnect()

// Lights, Camera, Action
streamer()
promote_byTweet()
promote_byRetweet()
stream_follow()
stream_mention()
stream_dm()
everydayTrender()
troll()
