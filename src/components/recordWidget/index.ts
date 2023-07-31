import {OpenRecordWidgetFunction} from "./types";
import {
  maskIcon,
  maskStopIcon,
  muteIcon,
  recordIcon,
  recordingIcon,
  stopRecordIcon,
  unmuteIcon
} from "../../assets/svg";

// wrapper element
const wrapper = document.createElement("div");
wrapper.setAttribute("id", "uno-record-widget");
wrapper.classList.add("uno-record-wrapper");
// Timer element
const timerWrapper = document.createElement("div");
timerWrapper.classList.add("uno-timer-wrapper");
wrapper.appendChild(timerWrapper);
const timer = document.createElement("span");
timer.classList.add("uno-timer");
timerWrapper.appendChild(timer);
// Record Elements
const recordWrapper = document.createElement("div");
recordWrapper.classList.add("uno-record-wrapper");
wrapper.appendChild(recordWrapper);
const startRecordButton = document.createElement("span");
startRecordButton.classList.add("uno-start-record");
startRecordButton.innerHTML = recordIcon;
recordWrapper.appendChild(startRecordButton);
const stopRecordButton = document.createElement("span");
stopRecordButton.classList.add("uno-stop-record");
stopRecordButton.innerHTML = stopRecordIcon;
const recordingButton = document.createElement("span");
recordingButton.classList.add("id", "uno-recording");
recordingButton.innerHTML = recordingIcon;
timerWrapper.appendChild(recordingButton);
// Mic Element
const muteWrapper = document.createElement("div");
muteWrapper.classList.add("uno-mute-wrapper");
wrapper.appendChild(muteWrapper);
const muteStartButton = document.createElement("span");
muteStartButton.classList.add("uno-mute-start");
muteStartButton.innerHTML = muteIcon;
muteWrapper.appendChild(muteStartButton);
const muteStopButton = document.createElement("span");
muteStopButton.classList.add("uno-mute-stop");
muteStopButton.innerHTML = unmuteIcon;
// Mask Element
const maskWrapper = document.createElement("div");
maskWrapper.classList.add("uno-mask");
wrapper.appendChild(maskWrapper);
const maskStartButton = document.createElement("span");
maskStartButton.classList.add("uno-mask-start");
maskStartButton.innerHTML = maskIcon;
maskWrapper.appendChild(maskStartButton);
const maskStopButton = document.createElement("span");
maskStopButton.classList.add("uno-mask-stop");
maskStopButton.innerHTML = maskStopIcon;
// Close Element
const closeButton = document.createElement("span");
closeButton.setAttribute("id", "uno-close");
wrapper.appendChild(closeButton);
const appendRecordWrapperToBody: Promise<HTMLElement> = new Promise(resolve => {
  document.body.appendChild(wrapper);
  resolve(timer);
});
export const openRecordWidget: OpenRecordWidgetFunction = async (
  startRecord,
  stopRecord,
  startMask,
  stopMask,
  closeWidget
) => {
  startRecordButton.onclick = () => {
    console.log("Start record");
    startRecord(true);
  };
  stopRecordButton.onclick = () => {
    console.log("Stop record");
    stopRecord(true);
  };
  maskStartButton.onclick = () => {
    console.log("Start mask");
    startMask(true);
  };
  maskStopButton.onclick = () => {
    console.log("Stop mask");
    stopMask(true);
  };
  closeButton.onclick = () => {
    console.log("Close widget");
    closeWidget(true);
    closeRecordWidget();
  };
  return await appendRecordWrapperToBody;
};
export const closeRecordWidget = () => {
  console.log("Close widget");
  wrapper.remove();
  timerWrapper.remove();
  timer.remove();
  closeButton.remove();
  muteWrapper.remove();
  muteStartButton.remove();
  muteStopButton.remove();
  maskWrapper.remove();
  maskStartButton.remove();
  maskStopButton.remove();
  recordWrapper.remove();
  recordingButton.remove();
  startRecordButton.remove();
  stopRecordButton.remove();
};
