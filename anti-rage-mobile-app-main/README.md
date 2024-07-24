# Anti-Rage-Mobile-App

## Description

The app is used to track your history of used curse words when gaming or doing other stuff. You will be warned if you are going a bit to crazy on your game, typing or screaming. If u think u aren't mad and we just made it to sensitive just change the parameters!

## Requirements to run/test

- Node.js (my version: 20.9)
- *optional (one required)*: 
    - Android Studio
    - Android phone:
        - Expo GO app 

## Installation and Running

- first of all u will have to pull the app into your local computer:

```
git clone <either url you use>
```
- go to the directory of the newly pulled app (anti-rage-mobile-app/RageApp)
- when inside the directory install node packages:
```
npm install
```
- after installation you have 2 options to run the app:

    1. On your own **physical** phone:
`
npx expo start --tunnel
`
    
    2. On an **emulator** on your machine: 
[React native emulator setup](https://reactnative.dev/docs/environment-setup?guide=native)


- Option 1, should give u a QR-code and a url. Scan this link in your **Expo GO app** or fill in the url.

- project bundler should be completed and no errors should be shown

*Errors*
-
If after running the app **and the bundler is completed**, errors are shown, I make use of an .env file for some keys. For security reasons this is not published on git.

## Sensors

- Accelerometer:
    - Used to get the users movement of the phone, to see if the person needs to calm down. User gets warning message.
- Fingerprint:
    - used to login to your account
    - Note: face recognition also works

## Data

The app itself only makes sure the application settings of the user are correctly updated and stored. All the other data (Curse words and notifications) comes from the desktop application that monitors the user, gets the data and sends it to the cloud that computes it and sends it to this app to use.

## Events

If a user starts typing like crazy, notifications will start popping up to let him know to calm down. Another event is explained above in *Sensors* section.

## Future Plans

### Functional
The main functionality that we want to implement is being able retrieve clips of when you are raging. We are able to retrieve sentences from a microphone but we also want audio clips from those moments, that a person is raging. So you could listen to them afterwards on the app.

### Performance/efficiency
Refractor/revamp usage of external services like: azure service bus. This means use another messagebroker or move away from expo and use the react native cli for the app (note: switching from expo to native cli would impact a lot of the current packages. would require a whole overhaul of code). These are 2 solution to the current state of getting notifications and the wordslist because the current setup isn't 100% fluent. The wordslist should also be fetchable through our contentful api, but because we use python on server side the contentful sdk doesn't support publishing.
<br />
<br />

The updating of the setting is not optimal because of the usage of contentful which is not super fast with the publishing of data. We can optimize this by finding a way to speed up that process or refractor at what point I change the state of the data, so it changes instantly and not after the publish of the data. The way the settings are saved in the state, makes it hard to do this. Would require other structure of saving the state.
