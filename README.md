# Glitter!
The **only bot** that could automate your Twitter Account at its best!

# Features
- Auto engager
This bot is capable to handle the circumstances where you get busy. When people mention you or DM you, bot can automatically reply of your absence right now.
**NOT JUST THAT!** This bot periodically publishes Tweets based on the Twitter Trends. So, you don't miss any trend that had the capability to bring you good followers.
- Follower Churner
Simply saying, this Twitter bot follows Thousands of people of your interests at once. The ones who don't follow you back can be unfollowed after some days. And the ones who have followed you back can also be unfollowed, but after 30 days.

This bot can work 24x7 for you being a watchdog about who followed back and who you followed. A NoSQL database is used in backend to retrieve and use all the data about whom you followed and whom you haven't.

This bot also takes some measures to prevent following false accounts. This software has been already tried many times. 1 out of every 5 people have followed back. That means, when this bot follows 5000 people, who have a fair chance of getting 1000 followers at once. **You can unfollow those exact people after some days. Not manually, bot does it for you!**
- Troller bot **(COMING SOON)**

# Documentation
<img src="https://github.com/KumarAbhirup/glitter/blob/9cb6299b0e9b41cda52064468df07ba6728a30e7/assets/how-to-glitter.jpg" alt="How to use Glitter" title="How to use Glitter" width="100%">

## Steps to follow

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
- Download all the files to your local machine by either cloning or directly downloading the zip file from this GitHub repo.
- Unzip the files and change the folder name from `glitter-master` to `glitter-<yourname>`.
- Once you downloaded the files, open `Terminal` if you are on Mac and if you use Windows, use the `Git bash` that you downloaded in Step 1.
- Once you open Terminal, enter into the project file: `$ cd glitter`. The command depends on your current folder location. **If you don't know how to use terminal, you may need to learn small tit-bits on internet.**
<!-- - Once you are in `glitter` folder, type this command in the Terminal: `$ npm install`. This process will download all the needed files that makes Glitter work. -->
- When dependencies are installed, you are done with the needs of bot!

### Step 4: Get Twitter API keys
- Go to [Twitter App Manager](https://apps.twitter.com)
- Create your new app and let the App name be: `glitter-bot-<yourname>`
- Once your app is created, go to the Keys and Access Token tab.
- If you see only 2 Consumer keys, you need to generate Access keys too...
- Under the same tab, find for a button which says `Change App Permissions`. Change the app permission to `Read, Write and Direct Message`.
- From the downloaded project, enter the API keys in `config.js` file.
```
{
    consumer_key: '...',
    consumer_secret: '...',
    access_token: '...',
    access_token_secret: '...'
}
```
- After you are ready with your API keys pasted somewhere, head over to next step.

### Step 5: Create your Heroku account
- Log on to [heroku.com](https://www.heroku.com)
- Create new App and let its name be: `glitter-bot-<yourname>`
- Once you create this app, head over to [Heroku Command Line Tools](https://devcenter.heroku.com/categories/command-line) and Install the Heroku CLI.
- When you are done downloading, open Terminal and type: `$ heroku login`
- Then it will ask you email and password, and when you are logged in, you are done and ready to use Glitter!

### Step 6: Setup the Project
- In the project folder, open `settings.js` and change the YOUR_NAME and YOUR_TWITTER_HANDLE property.
```
YOUR_NAME: 'my name goes here', // Eg. Steve Jobs
YOUR_TWITTER_HANDLE: 'my twitter handle goes here', // Your Twitter handle (without @)
```
- In `settings.js`, change the SCREEN_NAME and NICKNAME property. That needs to be of the person whose followers are to followed in Follower Churning process.
```
PERSON_TWITTER_HANDLE: 'john_doe', // The Twitter handle (without @) of the person whose followers are to be followed
PERSON_NICKNAME: 'JohnDoe' // A small name or a nickname of that person
```
- In `settings.js` change the `DATABASE` property to the app name that you inserted in Firebase. In your case, it might be `glitter-bot-<yourname>`.
```
DATABASE: 'glitter-bot-<yourname>' // App name that you inserted while creating project at Firebase
```
- If you are using the `master` branched project, you must be seeing a `settings.js` file with many more settings. **LEAVE THEM ALONE**. I'm building documentation to tell what those settings do.
- Remember the `glitter.json` file that you downloaded in Step 2? Copy that file to this project folder.
- **And you are almost done with your bot!**

### Last Step: Upload the files to your Heroku server
- To upload all the files to the Heroku server, you need Git installed (Step 1).
- Write these commands in Terminal (Make sure you are at Project's root path):
```
$ git init
$ heroku git:remote -a <name_of_your_heroku_app>
$ git add .
$ git commit -am "My Glitter bot deployed"
$ git push heroku master
```
- Once you push all your files, go to `resources` tab in Heroku Dashboard, and you should see something like this:

<img src="https://github.com/KumarAbhirup/glitter/blob/9cb6299b0e9b41cda52064468df07ba6728a30e7/assets/heroku.jpg" alt="Heroku Resources" title="Heroku Resources" width="100%">

- As you see in above image, switch on the `streamer` dyno to make your streamer work 24x7
- To check if you got any errors, open Terminal and type `heroku logs`. If you see good things, congratulations! Streamer is working...
- All this was just a setup. **THE REAL STUFF HASN'T YET STARTED!**

---

### How to use Glitter bot

> **Note:** Your Twitter account might get locked after few hours of starting this bot. Just unlock it by verifying email or phone number and your Twitter bot is ready to go without any interruption!

**Follow people of your interest:** In `settings.js`, you have given a reference to the Twitter handle whose followers are to be followed. If yes, then just go to `Resources` tab in Heroku and switch on the `follower` dyno. That will start following the followers immediately.

**Once you have followed the people, unfollow the people who haven't followed you back:** Do this step after 10 days of you following them. This will give them some time to follow you back. When you want to unfollow the ones who haven't followed you back, just go to `Resources` tab in Heroku and switch on the `unfollow_unfollower` dyno. This will start unfollowing those people.

**Unfollow the people who followed you back:** Do this step after a month or two of you following them. This won't let them know that you unfollowed them. When you want to unfollow the ones who followed you back, just go to `Resources` tab in Heroku and switch on the `unfollow_follower` dyno. This will start unfollowing those people.

**And that's it! Future Glitter updates will surely have some more automation and will make tasks easier for you :-)**

### Errors that you might face
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
- Type this command: `$ heroku restart` in the Terminal.

## Terms of use
This software is free to use. Enjoy glittering!

**If you experience any kind of bug, do let me know... will improve this bot together. Thank you.**
