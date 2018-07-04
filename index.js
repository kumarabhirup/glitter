// Magic. Do not touch.

/*
 * You may think you know what the following code does.
 * But you dont. Trust me.
 * Fiddle with it, and youll spend many a sleepless
 * night cursing the moment you thought youd be clever
 * enough to "optimize" the code below.
 * Now close this file and go play with something else.


 FFFFFFFF  UU    UU  CCCCCCCC  KK    KK        YY   YY  OOOOOOOOO  UU    UU
 FF        UU    UU  CC        KK  KK           YY YY   OO     OO  UU    UU
 FFFFFF    UU    UU  CC        KKKK              YY     OO     OO  UU    UU
 FF        UU    UU  CC        KK  KK            YY     OO     OO  UU    UU
 FF         UUUUUU   CCCCCCCC  KK    KK          YY     OOOOOOOOO   UUUUUU


 */

















































































 // listen on port so now.sh likes it
 const { createServer } = require('http')

 // Import, Import!!!!
 var settings = require('./src/settings');
 var databaseConnect = require('./src/bots/untouchables/databaseConnect').connect;
 var engager = require('./src/bots/engager');
 var bulk_follow = require('./src/bots/follower');
 var bulk_unfollow_unfollowers = require('./src/bots/unfollow_unfollower');
 var bulk_unfollow_followers = require('./src/bots/unfollow_follower');

 // Connect to the database
 databaseConnect()

 // Lights, Camera, Action!!!
 engager()
 bulk_follow()
 bulk_unfollow_unfollowers()
 bulk_unfollow_followers()

 // This will allow the bot to run on now.sh
 const server = createServer((req, res) => {
   res.writeHead(302, {
     Location: `https://twitter.com/${settings.YOUR_TWITTER_HANDLE}`
   })
   res.end()
 })

 server.listen(3000)
