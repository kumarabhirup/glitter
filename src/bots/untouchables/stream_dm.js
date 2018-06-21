var Twit = require('twit');
var Request = require("request");
var Util = require('util');
var config = require('../../config'); // Find for config.js in the parent folder
var settings = require('../../settings'); // Find for settings.js in the parent folder

var makeReplyCode = require('./makeReplyCode');
var firebase = require('./databaseConnect').database;

var T = new Twit(config);
var streamUser = T.stream('user'); // This is Deprecated (di-pri-ke-te-d) by Twitter and needs an update soon

const stream_dm = () => {
  // Whenever someone sends a direct message, this event is Fired.
  streamUser.on('direct_message', function (directMsg) {

    console.log("Someone DMed you!");

    var sender_sname = directMsg.direct_message.sender.screen_name;
    var sender_name = directMsg.direct_message.sender.name;
    var what_sender_sent = directMsg.direct_message.text;

    var timestamp = Date.now();
    var reply_code = makeReplyCode();

    if (sender_sname != settings.YOUR_TWITTER_HANDLE) {
      // Enter this information in `Streamed` table
      firebase.database().ref("streamed").child("direct_messages").push().update({
          text: what_sender_sent,
          name: sender_sname,
          timestamp: timestamp,
          reply_code: reply_code
      });
    } else {
      // Nothing
    }

    if(settings.DM_BACK_ENGAGER_STATUS == 'ON' && sender_sname != settings.YOUR_TWITTER_HANDLE){

      // Reply by DM (Gives out error if the Mentioner doesn't follow you)
      var direct_message_when_dm = settings.DM_BACK_GREET + " " + sender_name + "! \n" + settings.DM_BACK_MSG;
      T.post('direct_messages/new', { screen_name: sender_sname, text: direct_message_when_dm },  function (err, data, response) {
        if(!err){

          if(sender_sname != settings.YOUR_TWITTER_HANDLE){ // To stop infinite logging

              console.log("I'm not there DM for DM reply sent successfully to " + sender_name + ".");

              // Enter this information in `messages_replies` table
              firebase.database().ref("messages_replies").child("messages").push().update({
                  text: direct_message_when_dm,
                  intent: "im_not_there",
                  receiver: sender_sname,
                  timestamp: timestamp,
                  reply_code: reply_code
              });

          } else {
            // Nothing
          }

        } else{
          console.log(err);
        }
      });

    } else{
      // Nothing
    }
  });
};

module.exports = stream_dm;
