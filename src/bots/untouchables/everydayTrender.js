var Twit = require('twit');
var Request = require("request");
var config = require('../../config'); // Find for config.js in the parent folder
var settings = require('../../settings'); // Find for settings.js in the parent folder

var makeReplyCode = require('./makeReplyCode');
var firebase = require('./databaseConnect').database;

var T = new Twit(config);

const everydayTrender = () => {
  // Tweet everyday Trends
  if(settings.EVERYDAY_TRENDER == 'ON'){

    everydayTrends();
    function everydayTrends(){

      function displayTime(type) { // Time Displayer
          var str = "";

          var currentTime = new Date();
          var hours = currentTime.getHours();
          var minutes = currentTime.getMinutes();
          var seconds = currentTime.getSeconds();
          var day = currentTime.getDay();

          if (minutes < 10) {
              minutes = "0" + minutes
          }
          if (seconds < 10) {
              seconds = "0" + seconds
          }
          str += hours + ":" + minutes + ":" + seconds + " ";
          if(hours > 11){
              str += "PM"
          } else {
              str += "AM"
          }

          if (type == 'day') {
            return day;
          } else if (type == 'hour') {
            return hours;
          } else{
            return str;
          }

      }

      /*=============================================>>>>>
      = Get Random Proverb =
      ===============================================>>>>>*/

      function requestProverb(){

        Request.get("https://talaikis.com/api/quotes/random", (error, response, body) => {
            if(error) {

                console.log(error);

            } else{ // If no error

              // Define
              var result = JSON.parse(body);
              var quote = result.quote;
              var auth = result.author;
              var category = result.cat;

              // Filter
              if(category == 'love' || category == 'sex' || category == 'beauty'){ // Don't get proverbs related to love and sex

                console.log("NO VULGARITY.");
                requestProverb();

              } else if (quote.length > 80) { // Quotes should be smaller

                console.log("SMALLER QUOTE NEEDED.");
                requestProverb();

              } else{ // Pick up the quote!

                  /*=============================================>>>>>
                  = Tweet Everyday =
                  ===============================================>>>>>*/

                  function tweetProverb(tweet){
                    T.post('statuses/update', { status: tweet }, function(err, data, response) {
                      if(!err){

                        var tweet_id = data.id_str;
                        var timestamp = Date.now();

                        console.log("Everyday trending tweet is Tweeted!");

                        // Enter this information in `Streamed` table
                        firebase.database().ref("tweets").child("everyday_trends").push().update({
                            status_id: tweet_id,
                            timestamp: timestamp
                        });

                      } else{
                        console.log(err);
                      }
                    });
                  }

                  if(displayTime('day') == 1){

                    var tweet = quote + "\n - " + auth + "\n" + settings.MONDAY;
                    tweetProverb(tweet);

                  } else if (displayTime('day') == 2) {

                    var tweet = quote + "\n - " + auth + "\n" + settings.TUESDAY;
                    tweetProverb(tweet);

                  } else if (displayTime('day') == 3) {

                    var tweet = quote + "\n - " + auth + "\n" + settings.WEDNESDAY;
                    tweetProverb(tweet);

                  } else if (displayTime('day') == 4) {

                    var tweet = quote + "\n - " + auth + "\n" + settings.THURSDAY;
                    tweetProverb(tweet);

                  } else if (displayTime('day') == 5) {

                    var tweet = quote + "\n - " + auth + "\n" + settings.FRIDAY;
                    tweetProverb(tweet);

                  } else if (displayTime('day') == 6) {

                    var tweet = quote + "\n - " + auth + "\n" + settings.SATURDAY;
                    tweetProverb(tweet);

                  } else if (displayTime('day') == 7) {

                    var tweet = quote + "\n - " + auth + "\n" + settings.SUNDAY;
                    tweetProverb(tweet);

                  }

                  /*= End of Tweet Everyday =*/
                  /*=============================================<<<<<*/

              }
            }
        });

      } requestProverb();

      /*= End of Get Proverb =*/
      /*=============================================<<<<<*/

    } setInterval(everydayTrends, 1000*60*60*6); // Tweet the Everyday Trends after every 6 hours (1000*60*60*6)

  } else {
    // Nothing
  }
};

module.exports = everydayTrender;
