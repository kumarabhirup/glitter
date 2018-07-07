// listen on port so now.sh likes it
const { createServer } = require('http')

console.log("The engager bot is starting...");
var settings = require('../settings');

// Include all bots
var databaseConnect = require('./untouchables/databaseConnect').connect;
var streamer = require('./untouchables/streamer');
var promote_byTweet = require('./untouchables/promote_byTweet');
var stream_follow = require('./untouchables/stream_follow');
var everydayTrender = require('./untouchables/everydayTrender');

// Connect
databaseConnect()

// Lights, Camera, Action
streamer()
promote_byTweet()
stream_follow()
everydayTrender()

// This will allow the bot to run on now.sh
const server = createServer((req, res) => {
  res.writeHead(302, {
    Location: `https://twitter.com/${settings.YOUR_TWITTER_HANDLE}`
  })
  res.end()
})

server.listen(3000)
