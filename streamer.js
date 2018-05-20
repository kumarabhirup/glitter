console.log('The streamer bot is starting...');

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

/*=============================================>>>>>
= Phase 2 (Store the screen_name of the person who followed back) =
===============================================>>>>>*/
  // Listen the `follow` event
  stream.on('follow', function (eventMsg) {

    var screen_name = eventMsg.source.screen_name; // screen_name of the person who followed

    // Check if the screen_name exists in Firebase Database
    firebase.database().ref("followed_followers_of/" + settings.PERSON_TWITTER_HANDLE).child(screen_name).on("value", function(snapshot) {
      if(snapshot.val() != null){ // If the screen_name was already followed

        console.log('@' + screen_name + " followed back to you.");

        // Enter that name in database
        firebase.database().ref("followbacks").child(settings.PERSON_TWITTER_HANDLE).update({
          [screen_name]: {
            connection: "friends"
          }
        });

        // Delete the screen_name from `to_unfollow` table
        firebase.database().ref("to_unfollow/" + settings.PERSON_TWITTER_HANDLE).child(screen_name).remove();

      } else{
        console.log('@' + screen_name + " followed you.");
      }
    });

  });
/*= End of Phase 2 =*/
/*=============================================<<<<<*/
