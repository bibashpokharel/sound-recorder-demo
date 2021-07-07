# Sound Recorder App Demo

This repo contains a demo electron js application that is capable of recording sound from user's input device and store the recording in the machine locally.

## Steps to follow to run the app:

<ul>
<li>First clone the repo in your machine locally.</li>
<li>Now, its time to install node_modules. For that either the command "npm install" or "yarn" will work. Please use the command "yarn" if and only if you have yarn installed in your machine. "npm install" command is the safe way to go.</li>
<li>Its tome to fire up the app. "npm run start" or "yarn start" command will fire up the app.</li>
<li>Now, you can utilize the sound recorder app.
</ul>

## File Storage :

The application will create a folder called "recordings" in the Desktop of your machine. Every recording will be saved inside "recordings" folder.

## Caveats :

Since the app is made using the native MediaSource provided by HTML5 and electron js application uses Chromium to render the content, the recorder sound wil be saved in .webm format in the storage. Converting the file to .mp3 or similar format is not done as of now.
