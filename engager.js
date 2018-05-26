console.log("This is the Engager bot.");

var Twit = require('twit');
var config = require('./config'); // Find config.js in same folder
var settings = require('./settings'); // Find for settings.js in same folder

// Connecting Firebase database
var firebase = require("firebase-admin");
var serviceAccount = require("./glitter.json");

  // Initialize connection
  var database = "https://" + settings.DATABASE + ".firebaseio.com";
  firebase.initializeApp({
    credential: firebase.credential.cert(serviceAccount),
    databaseURL: database
  });

var T = new Twit(config);
var stream = T.stream('user'); // This is Deprecated (di-pri-ke-te-d) by Twitter and needs an update soon

stream.on('follow', function (eventMsg) {

  var who_followed  = eventMsg.source.id;
  var who_followed_sname  = eventMsg.source.screen_name;
  var who_followed_name  = eventMsg.source.name;

  console.log(who_followed_name + " followed.");

  // Send Automated Direct Message
  if(settings.FOLLOW_ENGAGER_STATUS_DM == 'ON'){

    var direct_message = settings.FOLLOW_THANK_U_NOTE_GREET + " " + who_followed_name + "! " + settings.FOLLOW_THANK_U_NOTE_MSG;
    T.post('direct_messages/new', { screen_name: who_followed_sname, text: direct_message },  function (err, data, response) {
      if(!err){
        console.log("Follow Thank you note sent successfully to " + who_followed_name + ".");
      } else{
        console.log(err);
      }
    });

  } else{
    console.log(null);
  }

  // Send Automated Tweet
  if(settings.FOLLOW_ENGAGER_STATUS_TWEET == 'ON'){

    var tweet = settings.FOLLOW_THANK_U_TWEET_GREET + " " + who_followed_name + " (@" + who_followed_sname + ")..." + " " + settings.FOLLOW_THANK_U_TWEET_MSG;
    T.post('statuses/update', { status: tweet }, function(err, data, response) {
      if(!err){
        console.log("Follow Thank you tweet sent successfully to " + who_followed_name + ".");
      } else{
        console.log(err);
      }
    });

  } else{
    console.log(null);
  }

});
