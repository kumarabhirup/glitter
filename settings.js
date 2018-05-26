// This file contains the screen_name of the person whose's followers to follow
module.exports = Object.freeze({
  // Setup
  YOUR_NAME: 'my name goes here', // Eg. Steve Jobs
  YOUR_TWITTER_HANDLE: 'my twitter handle goes here', // Your Twitter handle (without @)
  DATABASE: 'glitter-bot-<yourname>', // App name that you inserted while creating project at Firebase

  // A famous screen_name for Follower_Churn
  PERSON_TWITTER_HANDLE: 'JohnDoe', // The Twitter handle (without @) of the person whose followers are to be followed
  PERSON_NICKNAME: 'john_doe', // A small name or a nickname of that person

  // Engager bot for DM after follow
  FOLLOW_ENGAGER_STATUS_DM: 'OFF', // Keep it OFF if you don't want this bot to automatically DM someone who followed you. Else, turn it ON.
  FOLLOW_THANK_U_NOTE_GREET: "Hey,", // Result: Hey, <name-of-person-who-followed>!
  FOLLOW_THANK_U_NOTE_MSG: "Thanks for following me on Twitter.",

  // Engager bot for Thank You Tweet after follow
  FOLLOW_ENGAGER_STATUS_TWEET: 'OFF', // Keep it OFF if you don't want this bot to automatically Mention-Tweet someone who followed you. Else, turn it ON.
  FOLLOW_THANK_U_TWEET_GREET: "Hey,", // Result: Hey, @<screen-name-of-person-who-followed>...
  FOLLOW_THANK_U_TWEET_MSG: "Thanks for following me on Twitter.",

  // Engager bot for replying people who mentioned you
  REPLY_ENGAGER_STATUS: 'OFF', // Keep it OFF if you don't want this bot to automatically Mention-Tweet someone who followed you. Else, turn it ON.

    // Reply by Tweet
    REPLY_M_NOT_THERE_TWEET_GREET: "Hey,", // Result: Hey, @<screen-name-of-person-who-mentioned>...
    REPLY_M_NOT_THERE_TWEET_MSG: "I'm not on Twitter right now. Will get back later. :-)",

    // Reply by DM (Only if the one who mentioned follows you)
    REPLY_M_NOT_THERE_DM_GREET: "Hey,", // Result: Hey, @<screen-name-of-person-who-mentioned>...
    REPLY_M_NOT_THERE_DM_MSG: "You just mentioned me in your Tweet yea? Will reply you soon. :-)"
});
