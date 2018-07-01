// This file contains all the settings that drive this bot to the result.
module.exports = Object.freeze({

  // Setup
  YOUR_NAME: 'my name goes here', // Eg. Steve Jobs
  YOUR_TWITTER_HANDLE: 'my twitter handle goes here', // Your Twitter handle (without @)
  DATABASE: 'glitter-bot-<yourname>', // App name that you inserted while creating project at Firebase

  // A famous screen_name for Follower_Churn
  PERSON_TWITTER_HANDLE: 'JohnDoe', // The Twitter handle (without @) of the person whose followers are to be followed
  PERSON_NICKNAME: 'john_doe', // A small name or a nickname of that person

  // When someone follows
    // Engager bot for DM after follow
    FOLLOW_ENGAGER_STATUS_DM: 'ON', // Keep it OFF if you don't want this bot to automatically DM someone who followed you. Else, turn it ON.
    FOLLOW_THANK_U_NOTE_GREET: "Hi,", // Result: Hey, <name-of-person-who-followed>!
    FOLLOW_THANK_U_NOTE_MSG: "Thanks for following me on Twitter. :) I use #GlitterBot for automating my Twitter account. When will you? https://github.com/KumarAbhirup/glitter",

    // Engager bot for Thank You Tweet after follow
    FOLLOW_ENGAGER_STATUS_TWEET: 'OFF', // Keep it OFF if you don't want this bot to automatically Mention-Tweet someone who followed you. Else, turn it ON.
    FOLLOW_THANK_U_TWEET_GREET: "Hey,", // Result: Hey, @<screen-name-of-person-who-followed>...
    FOLLOW_THANK_U_TWEET_MSG: "Thanks for following me on Twitter.",

  // Tweet the Everyday trends
  EVERYDAY_TRENDER: 'ON', // Keep it OFF if you don't want EveryDay Tweets.
    // Everyday Hashtags
    MONDAY: "#MondayMotivation #MondayMorning #MusicMonday",
    TUESDAY: "#TuesdayMotivation #TuesdayThoughts",
    WEDNESDAY: "#WednesdayWisdom #WonderfulWednesday",
    THURSDAY: "#ThrowbackThursday #ThankfulThursday",
    FRIDAY: "#FridayFeeling #FollowFriday",
    SATURDAY: "#SaturdaySpirit #Saturday",
    SUNDAY: "#SundayFunday",

  // PROMOTION
  PROMOTION: 'ON'

});
