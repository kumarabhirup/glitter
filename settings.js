// This file contains the screen_name of the person whose's followers to follow
module.exports = Object.freeze({
    PERSON_TWITTER_HANDLE: 'john_doe', // The Twitter handle (without @) of the person whose followers are to be followed
    PERSON_NICKNAME: 'JohnDoe', // A small name or a nickname of that person
    DATABASE: 'glitter-bot-<yourname>' // App name that you inserted while creating project at Firebase

    // Engager bot for DM after follow
    FOLLOW_ENGAGER_STATUS_DM: 'OFF', // Keep it OFF if you don't want this bot to automatically DM someone who followed you. Else, turn it ON.
    FOLLOW_THANK_U_NOTE_GREET: "Hey,", // Result: Hey, <name-of-person-who-followed>!
    FOLLOW_THANK_U_NOTE_MSG: "Thanks for following me on Twitter.",

    // Engager bot for Thank You Tweet after follow
    FOLLOW_ENGAGER_STATUS_TWEET: 'OFF', // Keep it OFF if you don't want this bot to automatically Mention-Tweet someone who followed you. Else, turn it ON.
    FOLLOW_THANK_U_TWEET_GREET: "Hey,", // Result: Hey, @<screen-name-of-person-who-followed>...
    FOLLOW_THANK_U_TWEET_MSG: "Thanks for following me on Twitter."
});
