# Glitter!
The **only bot** that could tweets a random proverb and its writer with an EveryDay Hashtag. **(Eg. #MondayMorning, #FridayFeeling)**

# Features
- Send a sweet ThankU message to a person who followed you.
- 'Everyday Trend' Tweeter **(Eg. #MondayMorning, #FridayFeeling)**

### What is Everyday Trend Tweeter?
Have you seen a **#MondayMotivation** or a **#FridayFeeling** tweet with a random proverb above? You might be doing it by copying proverbs and pasting it in twitter composer. But now, _Bot does it for you everyday!_

<img src="https://preview.ibb.co/kzLTGd/Everyday_Trender_Tweet.jpg" alt="How to everydayTrends" title="How to everydayTrends" width="100%">

# Documentation
<img src="https://github.com/KumarAbhirup/glitter/blob/9cb6299b0e9b41cda52064468df07ba6728a30e7/assets/how-to-glitter.jpg" alt="How to use Glitter" title="How to use Glitter" width="100%">

## Installation

### Step 1: Install Git
Git will be useful for you as well as for Glitter bot to work efficiently.
Install Git Command Line tools [here](https://git-scm.com/downloads).

<!-- ### Step 2: Install Nodejs and NPM
NPM is the heart of Glitter. If you don't have that, Glitter won't work.
Install NPM [here](https://nodejs.org/en/download/current). -->

### Step 2: Sign up with Firebase (Google)
- To sign up at Firebase, you need a Gmail account.
- Head over to the [Firebase console](https://console.firebase.google.com/u/0/), and click add Project
- Write your project name like this: `glitter-bot-<yourname>` and click Create project
- Once you reach dashboard, Head Over to the settings icon at the top left and click `Project Settings`.
- Go to the Service Accounts tab and then click `Generate new private key` button. This should download a file. Rename that file to `glitter.json` and you're done with Firebase.

<img src="https://github.com/KumarAbhirup/glitter/blob/9cb6299b0e9b41cda52064468df07ba6728a30e7/assets/firebase-homepage.jpg" alt="Firebase" title="Firebase" width="100%">

### Step 3: Download the Glitter Project
- Download all the files to your local machine by directly downloading the zip file from this GitHub repo.
- Unzip the files and change the folder name from `glitter-master` to `glitter-<yourname>`.
- Once you downloaded the files, open `Terminal` if you are on Mac and if you use Windows, use the `Git bash` that you downloaded in Step 1.
- Once you open Terminal, enter into the project file: `$ cd glitter-<yourname>`. The command depends on your current folder location. **If you don't know how to use terminal, you may need to learn small tit-bits on internet.**
<!-- - Once you are in `glitter` folder, type this command in the Terminal: `$ npm install`. This process will download all the needed files that makes Glitter work. -->

### Step 4: Get Twitter API keys
- Go to [Twitter App Manager](https://apps.twitter.com)
- Create your new app and let the App name be: `glitter-bot-<yourname>`
- Once your app is created, go to the Keys and Access Token tab.
- If you see only 2 Consumer keys, you need to generate Access keys too...
- Under the same tab, find for a button which says `Change App Permissions`. Change the app permission to `Read, Write and Direct Message`.
- From the downloaded project, enter the API keys in `src/config.js` file.
```
{
    consumer_key: '...',
    consumer_secret: '...',
    access_token: '...',
    access_token_secret: '...'
}
```
- After you are ready with your API keys pasted in the `config.js`, head over to next step.

### Step 5: Create your Zeit Account
- Log on to [zeit.co](https://zeit.co/login). We'll be using their product (now.sh) for deployment.
- Install `now`.
```
$ npm i -g now
```

### Step 6: Setup the Project
- In the `src` folder, open `settings.js` and change the YOUR_NAME and YOUR_TWITTER_HANDLE property.
```
YOUR_NAME: 'my name goes here', // Eg. Steve Jobs
YOUR_TWITTER_HANDLE: 'my twitter handle goes here', // Your Twitter handle (without @)
```
- In `src/settings.js` change the `DATABASE` property to the app name that you inserted in Firebase. In your case, it might be `glitter-bot-<yourname>`.
```
DATABASE: 'glitter-bot-<yourname>' // App name that you inserted while creating project at Firebase
```
- In the same file, you will find settings for sending ThankU message when someone follows you. Keep `FOLLOW_ENGAGER_STATUS_DM` *ON* if you want to send *Thank You message* in form of a direct message. And.. Keep `FOLLOW_ENGAGER_STATUS_TWEET` *ON* if you want to send *Thank You message* in form of a public mentioned Tweet.
```
// When someone follows
  // Engager bot for DM after follow
  FOLLOW_ENGAGER_STATUS_DM: 'ON', // Keep it OFF if you don't want this bot to automatically DM someone who followed you. Else, turn it ON.
  FOLLOW_THANK_U_NOTE_GREET: "Hi,", // Result: Hey, <name-of-person-who-followed>!
  FOLLOW_THANK_U_NOTE_MSG: "Thanks for following me on Twitter. :) I use #GlitterBot for automating my Twitter account. When will you? https://github.com/KumarAbhirup/glitter",

  // Engager bot for Thank You Tweet after follow
  FOLLOW_ENGAGER_STATUS_TWEET: 'OFF', // Keep it OFF if you don't want this bot to automatically Mention-Tweet someone who followed you. Else, turn it ON.
  FOLLOW_THANK_U_TWEET_GREET: "Hey,", // Result: Hey, @<screen-name-of-person-who-followed>...
  FOLLOW_THANK_U_TWEET_MSG: "Thanks for following me on Twitter.",
```
- If you want to tweet everydayTrends with relevant proverbs and hashtags, keep `EVERYDAY_TRENDER` in `settings.js` *ON*. You can also edit and change the hashtags for every day of the week...
```
// Everyday Hashtags
MONDAY: "#MondayMotivation #MondayMorning #MusicMonday",
TUESDAY: "#TuesdayMotivation #TuesdayThoughts",
WEDNESDAY: "#WednesdayWisdom #WonderfulWednesday",
THURSDAY: "#ThrowbackThursday #ThankfulThursday",
FRIDAY: "#FridayFeeling #FollowFriday",
SATURDAY: "#SaturdaySpirit #Saturday",
SUNDAY: "#SundayFunday",
```
- Remember the `glitter.json` file that you downloaded in Step 2? Copy and Paste that file to the root of this project folder.
- **And you are almost done with your bot!**

### Last Step: Upload the files to your now.sh (Deploy Time!)
- Just type this in terminal:
```
$ now
```
- It will ask you for an email. Enter the email you provided while creating your Zeit account. Once entered, you many need to visit your Email Client and verify yourself.
- And you are done! You'll get your deployment-url in the terminal, and that's where your bot is located.

<img src="https://preview.ibb.co/c49L2J/Terminal.jpg" alt="Using Now.sh for deploying" title="Using Now.sh for deploying" width="100%">

- All this was just a setup. **THE REAL STUFF HASN'T YET STARTED!**

---

## How to use Glitter bot

### Change Settings and Deploy for second time
To do this, change and set texts as per your desire in `settings.js`. If you want to change the account on which bot will function, you need to change APP CONFIG keys in `config.js`.
Once you make all your changes,
hit these commands in your Terminal...
```
$ now ls
```
When you do this, you'll see your latest deployments. Just copy/grab the deployment-url of the latest glitter deployment and hit this command:
```
$ now rm <copied-deployment-url>
$ now
```
By doing this, you are ensuring that no other bot is controlling your account other than your latest fresh Twitter bot.

**And that's it! Future Glitter updates will surely have some more automation and will make tasks easier for you :-)**

---

## Errors that you might face
**Bot stopped working due to Account lock:** This is a common problem faced by many users. When your account gets locked, you should unlock the account by verifying Mobile number or Email id and then change the password.

**Invalid or Expired token: (Always faced after changing password)** This error comes after few hours of you changing your password. This is because when you change password, the Twitter API access keys get changed.
**Solution:**
- Generate the Consumer keys and Access Tokens again in the [Twitter App manager](https://apps.twitter.com)
- Now, Regenerate the Access token keys after you generate them again
- If you haven't changed App Permissions to `Read, Write and Direct Message`, do that now.
- From the downloaded project, enter the NEW API keys in `config.js` file.
```
{
    consumer_key: '...',
    consumer_secret: '...',
    access_token: '...',
    access_token_secret: '...'
}
```
- After you changed all the tokens and keys, deploy again. *(Scroll above to learn how to deploy bot for the second time)*

## Terms of use
This software is free to use. Enjoy glittering!

**If you experience any kind of bug, do let me know... will improve this bot together. Thank you.**
