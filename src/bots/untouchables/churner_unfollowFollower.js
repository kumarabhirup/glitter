var Twit = require('twit');
var Request = require("request");
var Util = require('util');
var config = require('../../config'); // Find for config.js in the parent folder
var settings = require('../../settings'); // Find for settings.js in the parent folder

var makeReplyCode = require('./makeReplyCode');
var firebase = require('./databaseConnect').database;

var T = new Twit(config);

const unfollowFollower = () => {
  /*=============================================>>>>>
  = Phase 4 for FOLLOWER_CHURN (Unfollow the screen_names who have followed you back) =
  ===============================================>>>>>*/
    // Get the screen_names in `followbacks` table
    firebase.database().ref("followbacks/" + settings.PERSON_TWITTER_HANDLE).once("value", function(snapshot) {

      // Functional Loop
      var i = 0;
      function timedLoop() { // unFollows the user after every `x` seconds

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

              if(snapshotToArray(snapshot).length != 0){

                if(snapshotToArray(snapshot).length > i){

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

                } else {
                  console.log("Process Complete.");
                }

              } else {
                console.log("Found no one to unfollow");
              }

            /*= End of Thing to be done =*/
            /*=============================================<<<<<*/

            // Increase value of variable `i` by 1. (Increment)
            i++;

            // How many times to loop
            if(i < 5000) {
                setTimeout( timedLoop, 1000*60*3 ); // After how many seconds. `1000` means 1 second.
            }

        }

        timedLoop(); // Run the loop

    });
  /*= End of Phase 4 =*/
  /*=============================================<<<<<*/
};

module.exports = unfollowFollower;
