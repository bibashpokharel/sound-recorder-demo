const ffmpeg = require("ffmpeg");
const chunk = [];
var recorder;

async function recording() {
  if (!recordingState) {
    document.getElementById("record").innerText = "Save";
    document.getElementById("cancel").removeAttribute("hidden");
    recordingState = true;
    startRecording();
    clockInterval = setInterval(recordingTimer, 1000);
  } else {
    document.getElementById("record").innerText = "Start";
    document.getElementById("cancel").setAttribute("hidden", "true");
    recordingState = false;
    stopRecording();
    clearInterval(clockInterval);
  }
}

async function startRecording() {
  try {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    recorder = new MediaRecorder(stream);
    recorder.state = "active";
    recorder.ondataavailable = async (e) => {
      console.log(recorder);
      chunk.push(e.data);
      if (recorder.state === "inactive") {
        console.log("called blob function");
        const blob = new Blob(chunk, { type: "audio/webm" });
        const response = await blobToBase64(blob);
        console.log(response);
        fs.writeFileSync(
          "/home/admin/Desktop/recordings/file.mp3",
          Buffer.from(response.replace("data:audio/webm;base64,", ""), "base64")
        );
      }
    };
    recorder.start(1000);
  } catch (err) {
    console.log("err at recording video: ", err);
  }
}

const blobToBase64 = (blob) => {
  const reader = new FileReader();
  reader.readAsDataURL(blob);
  return new Promise((resolve) => {
    reader.onloadend = () => {
      resolve(reader.result);
    };
  });
};

async function stopRecording() {
  try {
    recorder.stop();
    clearInterval(clockInterval);
  } catch (err) {
    console.log("err at stoping recording:", err);
  }
}

async function cancelRecording() {
  timer = 0;
  recordingTimer();
  document.getElementById("record").innerText = "Start";
  document.getElementById("cancel").setAttribute("hidden", "true");
  recordingState = false;
  recorder.stop();
  clearInterval(clockInterval);
}

function createAudioElement(blobUrl) {
  const downloadEl = document.createElement("a");
  downloadEl.style = "display: block";
  downloadEl.innerHTML = "download";
  downloadEl.download = "audio.webm";
  downloadEl.href = blobUrl;
  const audioEl = document.createElement("audio");
  audioEl.controls = true;
  const sourceEl = document.createElement("source");
  sourceEl.src = blobUrl;
  sourceEl.type = "audio/webm";
  audioEl.appendChild(sourceEl);
  document.body.appendChild(audioEl);
  document.body.appendChild(downloadEl);
}
