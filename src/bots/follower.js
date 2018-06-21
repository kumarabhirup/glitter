console.log('The mass following bot is starting...');

// Include all bots
var databaseConnect = require('./untouchables/databaseConnect').connect;
var follower = require('./untouchables/churner_follow');

// Connect to the Firebase Database
databaseConnect()

// Lights, Camera, Action
follower()
