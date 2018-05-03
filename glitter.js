console.log('Bot is starting...');

var Twit = require('twit');
var config = require('./config'); // Find config.js in same folder

var T = new Twit(config);

// Pick a celebrity and grab all the Follower IDs
T.get('followers/ids', { screen_name: 'wesbos', count:'10', cursor:'-1' },  function (err, data, response) {

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

                      // Follow and Unfollow the follower
                      T.post('friendships/create', { screen_name: screen_name },  function (err, data, response) {
                        if(!err){
                          console.log("Wesbos follower "+screen_name+" followed.")
                        } else{
                          console.log(err);
                        }
                      });

                      /*T.post('friendships/destroy', { screen_name: screen_name },  function (err, data, response) {
                        if(!err){
                          console.log("Wesbos follower "+screen_name+" unfollowed.")
                        } else{
                          console.log(err);
                        }
                      });*/

                    } else if (screen_name == null) {
                      return null;
                    }

                  });

            /*= End of Thing to be done =*/
            /*=============================================<<<<<*/

            // Increase value of variable `i` by 1. (Increment)
            i++;

            // How many times to loop
            if(i < 10) {
                timedLoop();
            }

        }, 5); // After how many seconds. `1000` means 1 second.

      }

      timedLoop(); // Run the loop

});
