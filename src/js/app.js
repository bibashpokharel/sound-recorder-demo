const { app } = require("electron").remote;
const fs = require("fs");
const mkdirp = require("mkdirp");

//recording time
var timer = 0;

const desktopPath = app.getPath("desktop");
const recordingFolder = `${desktopPath}/recordings`;

var recordingState = false;
var clockInterval;

// body onLoad function to list all the recording present in that folder
async function listAllRecordings() {
  try {
    //checking if the app folder exist or not
    const folderExist = fs.existsSync(recordingFolder);
    if (!folderExist) {
      mkdirp.sync(recordingFolder);
    }

    const ulContainer = document.getElementById("list-recordings");
    const files = await fs.promises.readdir(recordingFolder);

    //iterating over the files and displaying them in app
    if (files.length > 0) {
      for (const file of files) {
        const liElement = document.createElement("li");
        liElement.innerHTML = file;
        ulContainer.appendChild(liElement);
      }
    }
    if (!files.length > 0) {
      const liElement = document.createElement("li");
      liElement.innerHTML = "No recordings yet.";
      ulContainer.appendChild(liElement);
    }
  } catch (err) {
    console.trace("err:", err);
  }
}

async function recordingTimer() {
  let hr = Math.floor(timer / 3600);
  let min = Math.floor((timer - hr * 3600) / 60);
  let sec = timer - hr * 3600 - min * 60;
  if (hr < 10) hr = `0${hr}`;
  if (min < 10) min = `0${min}`;
  document.getElementById("record-timer").innerText = `${hr}:${min}:${sec}`;
  timer += 1;
}
