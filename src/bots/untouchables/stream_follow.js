var Twit = require('twit');
var Request = require("request");
var Util = require('util');
var config = require('../../config'); // Find for config.js in the parent folder
var settings = require('../../settings'); // Find for settings.js in the parent folder

var makeReplyCode = require('./makeReplyCode');
var firebase = require('./databaseConnect').database;

var T = new Twit(config);
var streamUser = T.stream('user'); // This is Deprecated (di-pri-ke-te-d) by Twitter and needs an update soon

// Fires when a User follows the authenticated account
const stream_follow = () => {
    streamUser.on('follow', function (eventMsg) {

      var who_followed  = eventMsg.source.id_str;
      var who_followed_sname  = eventMsg.source.screen_name;
      var who_followed_name  = eventMsg.source.name;

      var timestamp = Date.now();
      var reply_code = makeReplyCode();

      T.get('users/show', { id: who_followed }, function(err, data, response) {

        var following = data.following;

        if (who_followed_sname != settings.YOUR_TWITTER_HANDLE) {

          if (following == false) {
            // Enter this information in `Streamed` table
            firebase.database().ref("streamed").child("followed").push().update({
                name: who_followed_sname,
                type: "follow",
                timestamp: timestamp,
                reply_code: reply_code
            });
          } else if (following == true) {
            // Enter this information in `Streamed` table
            firebase.database().ref("streamed").child("followed").push().update({
                name: who_followed_sname,
                type: "follow_back",
                timestamp: timestamp,
                reply_code: reply_code
            });
          }

        } else {
          // Nothing
        }

      });

      console.log(who_followed_name + " followed.");

      // Send Automated Direct Message
      if(settings.FOLLOW_ENGAGER_STATUS_DM == 'ON' && who_followed_sname != settings.YOUR_TWITTER_HANDLE){

        var direct_message_when_followed = settings.FOLLOW_THANK_U_NOTE_GREET + " " + who_followed_name + "! \n" + settings.FOLLOW_THANK_U_NOTE_MSG;
        T.post('direct_messages/new', { screen_name: who_followed_sname, text: direct_message_when_followed },  function (err, data, response) {
          if(!err){

            console.log("Follow Thank you note sent successfully to " + who_followed_name + ".");

            // Enter this information in `messages_replies` table
            firebase.database().ref("messages_replies").child("messages").push().update({
                text: direct_message_when_followed,
                intent: "thanku_follow",
                receiver: who_followed_sname,
                timestamp: timestamp,
                reply_code: reply_code
            });

          } else{
            console.log(err);
          }
        });

      } else{
        console.log(null);
      }


      // Send Automated Tweet
      if(settings.FOLLOW_ENGAGER_STATUS_TWEET == 'ON' && who_followed_sname != settings.YOUR_TWITTER_HANDLE){

        var tweet = settings.FOLLOW_THANK_U_TWEET_GREET + " " + who_followed_name + " (@" + who_followed_sname + ")..." + "\n" + settings.FOLLOW_THANK_U_TWEET_MSG;
        T.post('statuses/update', { status: tweet }, function(err, data, response) {
          if(!err){

            var reply_id = data.id_str;

            console.log("Follow Thank you tweet sent successfully to " + who_followed_name + ".");

            // Enter this information in `messages_replies` table
            firebase.database().ref("messages_replies").child("replies").push().update({
                status_id: reply_id,
                intent: "thanku_follow",
                type: "tweet",
                name: who_followed_sname,
                timestamp: timestamp,
                reply_code: reply_code
            });

          } else{
            console.log(err);
          }
        });

      } else{
        console.log(null);
      }

  });
}

module.exports = stream_follow;
