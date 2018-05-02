console.log('Bot is starting...');

var Twit = require('twit');
var config = require('./config'); // Find config.js in same folder

var T = new Twit(config);

// Pick a celebrity and grab all the Follower IDs
T.get('followers/ids', { screen_name: 'elonmusk', count:'5000', cursor:'-1' },  function (err, data, response) {

    for (var i = 0; i < 5000; i++) {

        var peopleToFollow = data.ids[i];

        // T.post('friendships/create', { id: peopleToFollow },  function (err, data, response) {
        //   console.log(data);
        // }); 

        console.log(peopleToFollow);

    }

});
