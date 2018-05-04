console.log('Bot is starting...');

var Twit = require('twit');
var config = require('./config'); // Find config.js in same folder

var T = new Twit(config);

// Pick a celebrity and grab all the Follower IDs
T.get('followers/ids', { screen_name: 'wesbos', count:'5000', cursor:'-1' },  function (err, data, response) {

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

                        if(screen_name != null){ // Check if user is fake or not

                          /*=============================================>>>>>
                          = Follow him or her =
                          ===============================================>>>>>*/

                            // Look for relationship between you and user
                            var doYouFollow = data.following;
                            if(doYouFollow == false){ // If you don't follow, then follow them

                              // Follow
                              T.post('friendships/create', { screen_name: screen_name },  function (err, data, response) {
                                if(!err){
                                  console.log("Wesbos follower "+screen_name+" followed.")
                                } else{
                                  console.log(err);
                                }
                              });

                            } else{ // If you already follow them

                              /*// setTimeout(function () {

                                // UnFollow
                                T.post('friendships/destroy', { screen_name: screen_name },  function (err, data, response) {
                                  if(!err){
                                    console.log("Wesbos follower "+screen_name+" unfollowed.")
                                  } else{
                                    console.log(err);
                                  }
                                });

                              // }, 1000*60*60*24*3); // 3 days*/

                            }

                          /*= End of Follow him or her =*/
                          /*=============================================<<<<<*/

                        } else if (screen_name == null) {
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

            }, 1000*5); // After how many seconds. `1000` means 1 second.

          }

          timedLoop(); // Run the loop

      } else{
        console.log(err);
      }

});
