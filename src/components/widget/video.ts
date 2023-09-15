/**
 *
 * Implementation of a record video with various controls (start/stop record, mute/unmute, mask/unmask).
 *
 * The `openRecordWidget()` function creates a new record widget and opens it.\
 * The `onStartRecord` function is called when the user clicks the start record button.\
 * The `onStopRecord` function is called when the user clicks the stop record button.\
 * The `onStartMask` function is called when the user clicks the start mask button.\
 * The `onStopMask` function is called when the user clicks the stop mask button.\
 * The `onStartMute` function is called when the user clicks the start mute button.\
 * The `onStopMute` function is called when the user clicks the stop mute button.\
 *
 * */

// Timer element
import {
  maskIcon,
  muteIcon,
  recordIcon,
  recordingIcon,
  stopMaskIcon,
  stopRecordIcon,
  unmuteIcon
} from "../../assets/svg";

// Timer Elements
export const timerWrapper: HTMLDivElement = document.createElement("div");
export const counter: HTMLSpanElement = document.createElement("span");
// Icons Wrapper
const iconsWrapper: HTMLDivElement = document.createElement("div");
// Record Elements
export const recordWrapper: HTMLDivElement = document.createElement("div");
export const startRecordButton: HTMLSpanElement = document.createElement("span");
export const stopRecordButton: HTMLSpanElement = document.createElement("span");
export const recordingButton: HTMLSpanElement = document.createElement("span");
// Mic Elements
export const muteWrapper: HTMLDivElement = document.createElement("div");
export const muteStartButton: HTMLSpanElement = document.createElement("span");
export const muteStopButton: HTMLSpanElement = document.createElement("span");
// Mask Elements
export const maskWrapper: HTMLDivElement = document.createElement("div");
export const maskStartButton: HTMLSpanElement = document.createElement("span");
export const maskStopButton: HTMLSpanElement = document.createElement("span");

const initialVideoElements = (wrapper: HTMLElement): void => {
  // Timer elements
  timerWrapper.classList.add("uno-timer");
  wrapper.appendChild(timerWrapper);
  counter.classList.add("uno-timer-counter");
  counter.innerText = "00:00";
  timerWrapper.appendChild(counter);
  // Icons Wrapper
  iconsWrapper.classList.add("uno-icons-wrapper");
  wrapper.appendChild(iconsWrapper);
  // Record Elements
  recordWrapper.classList.add("uno-record");
  iconsWrapper.appendChild(recordWrapper);
  startRecordButton.classList.add("uno-record-start");
  startRecordButton.innerHTML = recordIcon;
  recordWrapper.appendChild(startRecordButton);
  stopRecordButton.classList.add("uno-record-stop");
  stopRecordButton.innerHTML = stopRecordIcon;
  recordingButton.classList.add("uno-record-recording");
  recordingButton.innerHTML = recordingIcon;
  timerWrapper.appendChild(recordingButton);
  // Mic Elements
  muteWrapper.classList.add("uno-mute");
  iconsWrapper.appendChild(muteWrapper);
  muteStartButton.classList.add("uno-mute-start");
  muteStartButton.innerHTML = muteIcon;
  muteWrapper.appendChild(muteStartButton);
  muteStopButton.classList.add("uno-mute-stop");
  muteStopButton.innerHTML = unmuteIcon;
  // Mask Elements
  maskWrapper.classList.add("uno-mask");
  iconsWrapper.appendChild(maskWrapper);
  maskStartButton.classList.add("uno-mask-start");
  maskStartButton.innerHTML = maskIcon;
  maskWrapper.appendChild(maskStartButton);
  maskStopButton.classList.add("uno-mask-stop");
  maskStopButton.innerHTML = stopMaskIcon;
};

export default initialVideoElements;
