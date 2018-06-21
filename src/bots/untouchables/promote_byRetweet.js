var Twit = require('twit');
var Request = require("request");
var Util = require('util');
var config = require('../../config'); // Find for config.js in the parent folder
var settings = require('../../settings'); // Find for settings.js in the parent folder

var makeReplyCode = require('./makeReplyCode');
var firebase = require('./databaseConnect').database;

var T = new Twit(config);
var streamGlitter = T.stream('statuses/filter', { track: ['glitterbot', 'glitter bot'] });

const promote_byRetweet = () => {
  // Fires when a some User writes about Glitter Bot
  streamGlitter.on('tweet', function (tweet) {

      var tweet_id = tweet.id_str;
      var tweeter_name = tweet.user.name;
      var tweeter_sname = tweet.user.screen_name;
      var retweeted = tweet.retweeted;

      var timestamp = Date.now();
      var reply_code = makeReplyCode();

      if(tweeter_sname != settings.YOUR_TWITTER_HANDLE && retweeted == false){
        // Enter this information in `Streamed` table
        firebase.database().ref("streamed").child("glitter_tweet").push().update({
            name: tweeter_sname,
            status_id: tweet_id,
            type: "tweet",
            timestamp: timestamp,
            reply_code: reply_code
        });
      } else {
        // Nothing
      }

      if(settings.PROMOTION == 'ON'){
        if(tweeter_sname != settings.YOUR_TWITTER_HANDLE && retweeted == false){

          // Retweet the Tweet
          T.post('statuses/retweet/:id', { id: tweet_id }, function(err, data, response) {
            if(!err){

              console.log("The Glitter Bot tweet of " + tweeter_name + " is retweeted.");

              // Enter this information in `Promotions` table
              firebase.database().ref("promotions").child("tweets").push().update({
                  name: tweeter_sname,
                  status_id: tweet_id,
                  type: "retweet",
                  timestamp: timestamp,
                  reply_code: reply_code
              });

            } else{
              console.log(err);
            }
          });

        } else{
          console.log("Can't retweet your own tweet.");
        }
      } else{
        return null;
      }

  });
};

module.exports = promote_byRetweet;
