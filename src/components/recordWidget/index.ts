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
// Timer element
const timerWrapper = document.createElement("div");
const counter = document.createElement("span");
// Record Elements
const recordWrapper = document.createElement("div");
const startRecordButton = document.createElement("span");
const stopRecordButton = document.createElement("span");
const recordingButton = document.createElement("span");
// Mic Element
const muteWrapper = document.createElement("div");
const muteStartButton = document.createElement("span");
const muteStopButton = document.createElement("span");
// Mask Element
const maskWrapper = document.createElement("div");
const maskStartButton = document.createElement("span");
const maskStopButton = document.createElement("span");
// Close Element
const closeButton = document.createElement("span");

const initialInnerElements = () => {
  // wrapper
  wrapper.setAttribute("id", "uno-record-widget");
  wrapper.classList.add("uno-record-wrapper");
  // Timer element
  timerWrapper.classList.add("uno-timer");
  wrapper.appendChild(timerWrapper);
  counter.classList.add("uno-timer-counter");
  counter.innerText = "00:00";
  timerWrapper.appendChild(counter);
  // Record Elements
  recordWrapper.classList.add("uno-record");
  wrapper.appendChild(recordWrapper);
  startRecordButton.classList.add("uno-record-start");
  startRecordButton.innerHTML = recordIcon;
  recordWrapper.appendChild(startRecordButton);
  stopRecordButton.classList.add("uno-record-stop");
  stopRecordButton.innerHTML = stopRecordIcon;
  recordingButton.classList.add("uno-record-recording");
  recordingButton.innerHTML = recordingIcon;
  timerWrapper.appendChild(recordingButton);
  // Mic Element
  muteWrapper.classList.add("uno-mute");
  wrapper.appendChild(muteWrapper);
  muteStartButton.classList.add("uno-mute-start");
  muteStartButton.innerHTML = muteIcon;
  muteWrapper.appendChild(muteStartButton);
  muteStopButton.classList.add("uno-mute-stop");
  muteStopButton.innerHTML = unmuteIcon;
  // Mask Element
  maskWrapper.classList.add("uno-mask");
  wrapper.appendChild(maskWrapper);
  maskStartButton.classList.add("uno-mask-start");
  maskStartButton.innerHTML = maskIcon;
  maskWrapper.appendChild(maskStartButton);
  maskStopButton.classList.add("uno-mask-stop");
  maskStopButton.innerHTML = maskStopIcon;
  // Close Element
  closeButton.classList.add("uno-close");
  closeButton.innerText = "✖";
  wrapper.appendChild(closeButton);
};
const appendRecordWrapperToBody = (): Promise<HTMLElement> =>
  new Promise(resolve => {
    initialInnerElements();
    document.body.appendChild(wrapper);
    resolve(counter);
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
    closeWidget(true);
    closeRecordWidget();
  };
  return await appendRecordWrapperToBody().then(response => response);
};
export const closeRecordWidget = () => {
  wrapper.remove();
  timerWrapper.remove();
  counter.remove();
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
