const ffmpeg = require("ffmpeg");
const chunk = [];
var recorder;

async function recording() {
  if (!recordingState) {
    document.getElementById("record").innerText = "Save";
    recordingState = true;
    startRecording();
    clockInterval = setInterval(recordingTimer, 1000);
  } else {
    document.getElementById("record").innerText = "Start";
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
          `${recordingFolder}/${Date.now()}.webm`,
          Buffer.from(response.replace("data:audio/webm;base64,", ""), "base64")
        );
        chunk.length = 0;
        timer = 0;
        recordingTimer();
        window.location.reload(true);
      }
    };
    recorder.start(1000);
  } catch (err) {
    console.log("err at recording video: ", err);
  }
}

async function stopRecording() {
  try {
    recorder.stop();
    clearInterval(clockInterval);
  } catch (err) {
    console.log("err at stoping recording:", err);
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
