var Twit = require('twit');
var Request = require("request");
var Util = require('util');
var config = require('../../config'); // Find for config.js in the parent folder
var settings = require('../../settings'); // Find for settings.js in the parent folder

var makeReplyCode = require('./makeReplyCode');
var firebase = require('./databaseConnect').database;

var T = new Twit(config);

const troll = () => {
  // Get the User ID from screen_names
  if(settings.TROLL_BOT == 'ON'){
    T.get('users/lookup', { screen_name: settings.TO_BE_TROLLED },  function (err, data, response) {

      var arrayOfToBeTrolled = [];

      var howManyToTroll = data.length;
      for (var i = 0; i < howManyToTroll; i++) {
        var object = data[i];
        var id = object.id_str; // Push the Ids of the SCREEN_NAMES in an array
        arrayOfToBeTrolled.push(id);
      }

      // console.log(arrayOfToBeTrolled);

      var streamPeople = T.stream('statuses/filter', { follow: arrayOfToBeTrolled }); // Get the list of IDs here

      streamPeople.on('tweet', function (tweet) { // Whenever, a person from TO_BE_TROLLED list tweets.

        // Definitions
        var tweet_id = tweet.id_str;
        var tweet_user_name = tweet.user.name;
        var tweet_user_sname = tweet.user.screen_name;

        // To get the difference between replies and tweets.
        var in_reply_to_sname = tweet.in_reply_to_screen_name;
        var in_reply_to_status_id_str = tweet.in_reply_to_status_id_str;

        var timestamp = Date.now();
        var reply_code = makeReplyCode();

        console.log(tweet_user_name + " is caught on Stream!");

        // A function which checks whether there is the specified object/key in the array
        function arrayContains(array, key) {
            for (var i = 0; i < array.length; i++) {
                if (array[i] === key) {
                    return true;
                }
            }
            return false;
        }

        if(in_reply_to_sname == null && in_reply_to_status_id_str == null && arrayContains(settings.TO_BE_TROLLED, tweet_user_sname)){
          // Enter this information in `Streamed` table
          firebase.database().ref("streamed").child("to_be_trolled").push().update({
              status_id: tweet_id,
              name: tweet_user_sname,
              timestamp: timestamp,
              reply_code: reply_code
          });
        } else {
          // Nothing
        }

        if(in_reply_to_sname != null && in_reply_to_status_id_str != null && !arrayContains(settings.TO_BE_TROLLED, tweet_user_sname)){ // Do nothing if Tweet is a reply and is not composed by any of the member in TO_BE_TROLLED list.
          return null;
        } else { // Troll!

          if(settings.TROLLS.length > 1){ // When more than one troll is specified
            var indexOfTrolledName = settings.TO_BE_TROLLED.findIndex(x => x==tweet_user_sname); // Get the index of the person who is to be trolled
            var troll = "@" + tweet_user_sname + " " + settings.TROLLS[indexOfTrolledName]; // Troll the user with relevant troll message
          } else{ // One troll for all
            var troll = "@" + tweet_user_sname + " " + settings.TROLLS[0];
          }

          T.post('statuses/update', { status: troll, in_reply_to_status_id: tweet_id }, function(err, data, response) {
            if(!err){

              var reply_id = data.id_str;

              console.log("Troll reply: \n" + troll + "\n sent to " + tweet_user_name + "!");

              // Enter this information in `messages_replies` table
              firebase.database().ref("messages_replies").child("replies").push().update({
                status_id: reply_id,
                intent: "troll",
                type: "reply",
                name: tweet_user_sname,
                timestamp: timestamp,
                reply_code: reply_code
              });

            } else{
              console.log(err);
            }
          });
        }

      });

    });
  } else {
    // Nothing
  }
};

module.exports = troll;
