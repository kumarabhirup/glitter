console.log('Bot is starting...');

var Twit = require('twit');
var config = require('./config'); // Find config.js in same folder

var T = new Twit(config);

// Pick a celebrity and grab all the Follower IDs
T.get('followers/ids', { screen_name: 'elonmusk', count:'5000', cursor:'-1' },  function (err, data, response) {

      // Functional Loop
      var i = 0;
      function timedLoop() { // Follow Function

        setTimeout(function () { // Follows the user after every 3 seconds

            // Thing to be done repeatedly
            var peopleToFollow = data.ids[i];
            console.log(peopleToFollow);
            i++;
            if(i < 5000) {
                timedLoop();
            }

        }, 1000*3);

      }
      timedLoop();

});
