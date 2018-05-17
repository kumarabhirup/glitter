console.log('The mass following bot is starting...');

var Twit = require('twit');
var config = require('./config'); // Find config.js in same folder
var settings = require('./settings'); // Find for settings.js in same folder

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
= Phase 1 (Follow the eligible users and store their screen_name in Firebase) =
===============================================>>>>>*/
  // Pick a celebrity and grab all the Follower IDs
  T.get('followers/ids', { screen_name: settings.PERSON_TWITTER_HANDLE, count:'5000', cursor:'-1' },  function (err, data, response) {

        var following_followers_of = settings.PERSON_TWITTER_HANDLE;

        if(!err){ // Check for an error

            // Functional Loop
            var i = 0;
            function timedLoop() { // Follow Function

              setTimeout(function () { // Follows the user after every `x` seconds

                  /*=============================================>>>>>
                  = Thing to be done =
                  ===============================================>>>>>*/

                    // Convert id into screen_name
                        var peopleToFollow = data.ids[i];
                        T.get('users/show', { id: peopleToFollow },  function (err, data, response) {

                          var screen_name = data.screen_name;
                          var protected_acc = data.protected;
                          var verified = data.verified;

                          if(screen_name != null && protected_acc==false && verified==false){ // Check if user's account is eligible and NOT protected

                            /*=============================================>>>>>
                            = Follow him or her =
                            ===============================================>>>>>*/

                              // Look for relationship between you and user
                              var doYouFollow = data.following;
                              if(doYouFollow == false){ // If you don't follow, then follow them

                                // Follow
                                T.post('friendships/create', { screen_name: screen_name },  function (err, data, response) {
                                  if(!err){

                                    console.log(settings.PERSON_NICKNAME + " follower " + screen_name + " followed.");

                                    // Save the data into database
                                    firebase.database().ref("followed_followers_of").child(following_followers_of).update({
                                      [screen_name]: {
                                        connection: "followed"
                                      }
                                    });

                                    // Save the data into the row of screen_names to be unfollwed
                                    firebase.database().ref("to_unfollow").child(following_followers_of).update({
                                      [screen_name]: {
                                        connection: "idk"
                                      }
                                    });

                                  } else{
                                    console.log(err);
                                  }
                                });

                            /*= End of Follow him or her =*/
                            /*=============================================<<<<<*/

                              } else{ // If you already follow them

                                function doNothing(){
                                  null;
                                }

                              }

                          } else if (screen_name == null || protected_acc==true || verified==true) { // If the user is not eligible to be followed
                            return null;
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

              }, 1000*30); // After how many seconds. `1000` means 1 second.

            }

            timedLoop(); // Run the loop

        } else{
          console.log(err);
        }

  });
/*= End of Phase 1 =*/
/*=============================================<<<<<*/
