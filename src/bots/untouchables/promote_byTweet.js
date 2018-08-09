var Twit = require('twit');
var Request = require("request");
var config = require('../../config'); // Find for config.js in the parent folder
var settings = require('../../settings'); // Find for settings.js in the parent folder

var makeReplyCode = require('./makeReplyCode');
var firebase = require('./databaseConnect').database;

var T = new Twit(config);

// Tweet that YOU USE Glitter bot (PROMOTIONAL)
const promote_byTweet = () => {
  if(settings.PROMOTION == 'ON'){
    // Tweet that user uses Glitter Bot
    function iUseThis(){

      var tweet = "Yo! I use #GlitterBot to make my Twitter Account interesting. \n When will you? https://github.com/KumarAbhirup/glitter";
      var timestamp = Date.now();

      T.post('statuses/update', { status: tweet }, function(err, data, response) {
        if(!err){

          var tweet_id = data.id_str;
          console.log("I use #GlitterBot Promotional Tweet published."); // You should promote Glitter Bot if you use it

          // Enter this information in `Promotions` table
          firebase.database().ref("promotions").child("tweets").push().update({
              status_id: tweet_id,
              type: "tweet",
              timestamp: timestamp
          });

        } else{
          console.log(err);
        }
      });

    } iUseThis();

  } else{
    console.log("You should Promote Glitter Bot if you use it. :-)");
  }
};


module.exports = promote_byTweet;
