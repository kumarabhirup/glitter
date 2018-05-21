console.log("The mass unfollowing bot is starting...");
console.log("This bot will unfollow the people who have followed you back.");

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

/*=============================================>>>>>
= Phase 4 (Unfollow the screen_names who have followed you back) =
===============================================>>>>>*/
  // Get the screen_names in `followbacks` table
  firebase.database().ref("followbacks/" + settings.PERSON_TWITTER_HANDLE).on("value", function(snapshot) {

    // Functional Loop
    var i = 0;
    function timedLoop() { // unFollow Function

      setTimeout(function () { // unFollows the user after every `x` seconds

          /*=============================================>>>>>
          = Thing to be done =
          ===============================================>>>>>*/

            function snapshotToArray(snapshot) { // This function converts the Snapshot data into an array
                var returnArr = [];

                snapshot.forEach(function(childSnapshot) {
                    var item = childSnapshot.val();
                    item.key = childSnapshot.key;

                    returnArr.push(item);
                });

                return returnArr;
            };

            var screen_name_to_unfollow = snapshotToArray(snapshot)[i].key;

            // UnFollow
            T.post('friendships/destroy', { screen_name: screen_name_to_unfollow },  function (err, data, response) {
              if(!err){
                console.log(settings.PERSON_NICKNAME + " follower " + screen_name_to_unfollow + " unfollowed.");

                // Create an `unfollowed` table and insert the screen_name there
                firebase.database().ref("unfollowed").child(settings.PERSON_TWITTER_HANDLE).update({
                  [screen_name_to_unfollow]: {
                    connection: "unfollowed"
                  }
                });

                // Delete the screen_name from `to_unfollow` table
                firebase.database().ref("followbacks/" + settings.PERSON_TWITTER_HANDLE).child(screen_name_to_unfollow).remove();

              } else{
                console.log(err);
              }
            });

          /*= End of Thing to be done =*/
          /*=============================================<<<<<*/

          // Increase value of variable `i` by 1. (Increment)
          i++;

          // How many times to loop
          if(i < 5000) {
              timedLoop();
          }

      }, 1000*180); // After how many seconds. `1000` means 1 second.

    }

    timedLoop(); // Run the loop

  });
/*= End of Phase 4 =*/
/*=============================================<<<<<*/
