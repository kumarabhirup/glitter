console.log("This is the Engager bot.");

var Twit = require('twit');
var config = require('../config'); // Find for config.js in the parent folder
var settings = require('../settings'); // Find for settings.js in the parent folder

// Connecting Firebase database
var firebase = require("firebase-admin");
var serviceAccount = require("../../glitter.json"); // To connect Glitter Bot to Firebase

  // Initialize connection
  var database = "https://" + settings.DATABASE + ".firebaseio.com";
  firebase.initializeApp({
    credential: firebase.credential.cert(serviceAccount),
    databaseURL: database
  });

var T = new Twit(config);
var streamUser = T.stream('user'); // This is Deprecated (di-pri-ke-te-d) by Twitter and needs an update soon
var streamMentions = T.stream('statuses/filter', { track: [settings.YOUR_NAME, settings.YOUR_TWITTER_HANDLE] });
var streamGlitter = T.stream('statuses/filter', { track: ['glitterbot', 'glitter bot'] });

// Tweet that YOU USE Glitter bot (PROMOTIONAL)
if(settings.PROMOTION == 'ON'){

  // Tweet that user uses Glitter Bot
  function iUseThis(){
    var tweet = "Yo! I use #GlitterBot to make my Twitter Account interesting. When will you? https://github.com/KumarAbhirup/glitter";
    T.post('statuses/update', { status: tweet }, function(err, data, response) {
      if(!err){
        console.log("I use #GlitterBot Promotional Tweet published."); // You should promote Glitter Bot if you use it
      } else{
        console.log(err);
      }
    });
  } iUseThis();


  // Fires when a some User writes about Glitter Bot
  streamGlitter.on('tweet', function (tweet) {

      var tweet_id = tweet.id_str;
      var tweeter_name = tweet.user.name;
      var tweeter_sname = tweet.user.screen_name;

      if(tweeter_sname != settings.YOUR_TWITTER_HANDLE){
        // Retweet the Tweet
        T.post('statuses/retweet/:id', { id: tweet_id }, function(err, data, response) {
          if(!err){
            console.log("The Glitter Bot tweet of " + tweeter_name + " is retweeted.");
          } else{
            console.log(err);
          }
        });
      } else{
        console.log("Can't retweet your own tweet.");
      }

  });

} else{
  console.log("You should Promote Glitter Bot if you use it. :-)");
}

// Fires when a User follows the authenticated account
streamUser.on('follow', function (eventMsg) {

  var who_followed  = eventMsg.source.id;
  var who_followed_sname  = eventMsg.source.screen_name;
  var who_followed_name  = eventMsg.source.name;

  console.log(who_followed_name + " followed.");

  // Send Automated Direct Message
  if(settings.FOLLOW_ENGAGER_STATUS_DM == 'ON'){

    var direct_message_when_followed = settings.FOLLOW_THANK_U_NOTE_GREET + " " + who_followed_name + "! " + settings.FOLLOW_THANK_U_NOTE_MSG;
    T.post('direct_messages/new', { screen_name: who_followed_sname, text: direct_message_when_followed },  function (err, data, response) {
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


// Fires when a some User mentions your name or twitter handle in a Tweet
streamMentions.on('tweet', function (tweet) {

    var tweet_id = tweet.id_str;
    var mentioner_name = tweet.user.name;
    var mentioner_sname = tweet.user.screen_name;

    // Tweet Reply when mentioned
    if(settings.REPLY_ENGAGER_STATUS == 'ON'){

      // Reply by Tweet
      var reply = settings.REPLY_M_NOT_THERE_TWEET_GREET + " " + mentioner_name + " (@" + mentioner_sname + ")..." + " " + settings.REPLY_M_NOT_THERE_TWEET_MSG;
      T.post('statuses/update', { status: reply, in_reply_to_status_id: tweet_id }, function(err, data, response) {
        if(!err){
          console.log("I'm not there Tweet sent successfully to " + mentioner_name + ".");
        } else{
          console.log(err);
        }
      });

      // Reply by DM (Gives out error if the Mentioner doesn't follow you)
      var direct_message_when_mentioned = settings.REPLY_M_NOT_THERE_DM_GREET + " " + mentioner_name + "! " + settings.REPLY_M_NOT_THERE_DM_MSG;
      T.post('direct_messages/new', { screen_name: mentioner_sname, text: direct_message_when_mentioned },  function (err, data, response) {
        if(!err){
          console.log("I'm not there DM reply sent successfully to " + mentioner_name + ".");
        } else{
          console.log(err);
        }
      });

    } else{
      console.log(null);
    }

});


// Whenever someone sends a direct message, this event is Fired.
streamUser.on('direct_message', function (directMsg) {

  var sender_sname = directMsg.direct_message.sender.screen_name;
  var sender_name = directMsg.direct_message.sender.name;

  if(settings.DM_BACK_ENGAGER_STATUS == 'ON'){

    // Reply by DM (Gives out error if the Mentioner doesn't follow you)
    var direct_message_when_dm = settings.DM_BACK_GREET + " " + sender_name + "! " + settings.DM_BACK_MSG;
    T.post('direct_messages/new', { screen_name: sender_sname, text: direct_message_when_dm },  function (err, data, response) {
      if(!err){

        if(sender_sname != settings.YOUR_TWITTER_HANDLE){ // To stop infinite logging
            console.log("I'm not there DM for DM reply sent successfully to " + sender_name + ".");
        } else {
          // Nothing
        }

      } else{
        console.log(err);
      }
    });

  } else{
    console.log(null);
  }

});
