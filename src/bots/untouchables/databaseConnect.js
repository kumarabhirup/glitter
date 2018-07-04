// Connecting Firebase database
var firebase = require("firebase-admin");
var serviceAccount = require("../../../glitter.json"); // To connect Glitter Bot to Firebase
var settings = require('../../settings');
var database = "https://" + settings.DATABASE + ".firebaseio.com";

const databaseConnect = () => {
  // Initialize connection
  firebase.initializeApp({
    credential: firebase.credential.cert(serviceAccount),
    databaseURL: database
  });
};

module.exports.connect = databaseConnect;
module.exports.database = firebase;
