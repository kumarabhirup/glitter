console.log('Phase 2 is starting...');

var Twit = require('twit');
var config = require('./config'); // Find config.js in same folder

// Connecting Firebase database
var firebase = require("firebase-admin");
var serviceAccount = require("./glitter.json");

  // Initialize connection
  firebase.initializeApp({
    credential: firebase.credential.cert(serviceAccount),
    databaseURL: "https://glitter-bot.firebaseio.com"
  });

var T = new Twit(config);
var stream = T.stream('statuses/filter', { track: ['bananas', 'oranges', 'strawberries'] })

/*=============================================>>>>>
= Phase 2 (Store the screen_name of the person who followed back) =
===============================================>>>>>*/
  // Listen the `follow` event
  stream.on('follow', function (eventMsg) {

  })
/*= End of Phase 2 =*/
/*=============================================<<<<<*/
