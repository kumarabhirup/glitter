console.log("The trend tweeter bot is starting...");

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

// Find for Trends in your location
