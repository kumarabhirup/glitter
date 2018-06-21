var Twit = require('twit');
var Request = require("request");
var Util = require('util');
var config = require('../../config'); // Find for config.js in the parent folder
var settings = require('../../settings'); // Find for settings.js in the parent folder

var makeReplyCode = require('./makeReplyCode');
var firebase = require('./databaseConnect').database;

var T = new Twit(config);
var streamMentions = T.stream('statuses/filter', { track: [settings.YOUR_NAME, settings.YOUR_TWITTER_HANDLE] });

const stream_mention = () => {
  // Fires when a some User mentions your name or twitter handle in a Tweet
  streamMentions.on('tweet', function (tweet) {

      console.log("You were mentioned.");

      var tweet_id = tweet.id_str;
      var mentioner_name = tweet.user.name;
      var mentioner_sname = tweet.user.screen_name;

      var timestamp = Date.now();
      var reply_code = makeReplyCode();

      if (mentioner_sname != settings.YOUR_TWITTER_HANDLE) {
        // Enter this information in `Streamed` table
        firebase.database().ref("streamed").child("mentions").push().update({
            status_id: tweet_id,
            name: mentioner_sname,
            timestamp: timestamp,
            reply_code: reply_code
        });
      } else {
        // Nothing
      }

      // Tweet Reply when mentioned
      if(settings.REPLY_ENGAGER_STATUS == 'ON' && mentioner_sname != settings.YOUR_TWITTER_HANDLE){

        // Reply by Tweet
        var reply = settings.REPLY_M_NOT_THERE_TWEET_GREET + " " + mentioner_name + " (@" + mentioner_sname + ")..." + "\n" + settings.REPLY_M_NOT_THERE_TWEET_MSG;
        T.post('statuses/update', { status: reply, in_reply_to_status_id: tweet_id }, function(err, data, response) {
          if(!err){

            var reply_id = data.id_str;

            console.log("I'm not there Tweet sent successfully to " + mentioner_name + ".");

            // Enter this information in `messages_replies` table
            firebase.database().ref("messages_replies").child("replies").push().update({
                status_id: reply_id,
                intent: "im_mentioned",
                type: "reply",
                name: mentioner_sname,
                timestamp: timestamp,
                reply_code: reply_code
            });

          } else{
            console.log(err);
          }
        });

        // Reply by DM (Gives out error if the Mentioner doesn't follow you)
        var direct_message_when_mentioned = settings.REPLY_M_NOT_THERE_DM_GREET + " " + mentioner_name + "! \n" + settings.REPLY_M_NOT_THERE_DM_MSG;
        T.post('direct_messages/new', { screen_name: mentioner_sname, text: direct_message_when_mentioned },  function (err, data, response) {
          if(!err){

            console.log("I'm not there DM reply sent successfully to " + mentioner_name + ".");

            // Enter this information in `messages_replies` table
            firebase.database().ref("messages_replies").child("messages").push().update({
                text: direct_message_when_mentioned,
                intent: "im_mentioned",
                receiver: mentioner_sname,
                timestamp: timestamp,
                reply_code: reply_code
            });

          } else{
            console.log(err);
          }
        });

      } else{
        // Nothing
      }

  });
}

module.exports = stream_mention;
