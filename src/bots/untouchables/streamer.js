var Twit = require('twit');
var Request = require("request");
var Util = require('util');
var config = require('../../config'); // Find for config.js in the parent folder
var settings = require('../../settings'); // Find for settings.js in the parent folder

var makeReplyCode = require('./makeReplyCode');
var firebase = require('./databaseConnect').database;

var T = new Twit(config);
var streamUser = T.stream('user'); // This is Deprecated (di-pri-ke-te-d) by Twitter and needs an update soon

const streamer = () => {
  /*=============================================>>>>>
  = Phase 2 for FOLLOWER_CHURN (Store the screen_name of the person who followed back) =
  ===============================================>>>>>*/
    // Listen the `follow` event
    console.log("Streamer bot is starting...");
    streamUser.on('follow', function (eventMsg) {

      var screen_name = eventMsg.source.screen_name; // screen_name of the person who followed

      var timestamp = Date.now();
      var reply_code = makeReplyCode();

      if(screen_name != settings.YOUR_TWITTER_HANDLE){ // Do not stream yourself
        firebase.database().ref("followed_followers_of/" + settings.PERSON_TWITTER_HANDLE).child(screen_name).on("value", function(snapshot) {
          if(snapshot.val() != null){ // Check if the screen_name exists in Firebase Database

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
      } else {
        // Do nothing
      }

    });
  /*= End of Phase 2 =*/
  /*=============================================<<<<<*/
};

module.exports = streamer;
