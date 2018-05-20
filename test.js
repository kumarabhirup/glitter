console.log("This is a test bot");

var Twit = require('twit');
var config = require('./config'); // Find config.js in same folder
var settings = require('./settings'); // Find for settings.js in same folder

// Connecting Firebase database
var firebase = require("firebase-admin");
var serviceAccount = require("./glitter.json");

  // Initialize connection
  var database = "https://" + settings.DATABASE + ".firebaseio.com";
  firebase.initializeApp({
    credential: firebase.credential.cert(serviceAccount),
    databaseURL: database
  });

var T = new Twit(config);

T.get('account/verify_credentials',  function (err, data, response) {
  console.log(data);
});
