console.log("The mass unfollowing bot is starting...");
console.log("This bot will unfollow the people who have followed you back.");

var Twit = require('twit');
var config = require('./config'); // Find config.js in same folder

// Connecting Firebase database
var firebase = require("firebase-admin");
var serviceAccount = require("./glitter.json");

  // Initialize connection
  firebase.initializeApp({
    credential: firebase.credential.cert(serviceAccount),
    databaseURL: "https://glitter-bot.firebaseio.com"
  });

var T = new Twit(config);

/*=============================================>>>>>
= Phase 4 (Unfollow the screen_names who have followed you back) =
===============================================>>>>>*/
  // Get the screen_names in `followbacks` table
  
/*= End of Phase 4 =*/
/*=============================================<<<<<*/


function timePass(lol){
  console.log("Just having fun with some code!! XD");
}
