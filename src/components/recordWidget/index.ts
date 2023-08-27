/**
 *
 * Implementation of a record widget with various controls (start/stop record, mute/unmute, mask/unmask).
 *
 * The `openRecordWidget()` function creates a new record widget and opens it.\
 * The `onStartRecord` function is called when the user clicks the start record button.\
 * The `onStopRecord` function is called when the user clicks the stop record button.\
 * The `onStartMask` function is called when the user clicks the start mask button.\
 * The `onStopMask` function is called when the user clicks the stop mask button.\
 * The `onStartMute` function is called when the user clicks the start mute button.\
 * The `onStopMute` function is called when the user clicks the stop mute button.\
 * The `onCloseWidget` function is called when the user clicks the close button.
 */

// Import necessary types from the "type" module.
import {OpenRecordWidgetFunction} from "./types";
import {
  maskIcon,
  stopMaskIcon,
  muteIcon,
  recordIcon,
  recordingIcon,
  stopRecordIcon,
  unmuteIcon,
  crossIcon
} from "../../assets/svg";

// wrapper element
const wrapper: HTMLDivElement = document.createElement("div");
// Timer element
const timerWrapper: HTMLDivElement = document.createElement("div");
const counter: HTMLSpanElement = document.createElement("span");
// Record Elements
const recordWrapper: HTMLDivElement = document.createElement("div");
const startRecordButton: HTMLSpanElement = document.createElement("span");
const stopRecordButton: HTMLSpanElement = document.createElement("span");
const recordingButton: HTMLSpanElement = document.createElement("span");
// Mic Element
const muteWrapper: HTMLDivElement = document.createElement("div");
const muteStartButton: HTMLSpanElement = document.createElement("span");
const muteStopButton: HTMLSpanElement = document.createElement("span");
// Mask Element
const maskWrapper: HTMLDivElement = document.createElement("div");
const maskStartButton: HTMLSpanElement = document.createElement("span");
const maskStopButton: HTMLSpanElement = document.createElement("span");
// Close Element
const closeButton = document.createElement("span");

const initialInnerElements = (): void => {
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
  maskStopButton.innerHTML = stopMaskIcon;
  // Close Element
  closeButton.classList.add("uno-close");
  closeButton.innerHTML = crossIcon;
  wrapper.appendChild(closeButton);
};
const appendRecordWrapperToBody = (): Promise<HTMLSpanElement> =>
  new Promise(resolve => {
    initialInnerElements();
    document.body.appendChild(wrapper);
    resolve(counter);
  });
export const openRecordWidget: OpenRecordWidgetFunction = async ({
  onStartRecord,
  onStopRecord,
  onStartMask,
  onStopMask,
  onStartMute,
  onStopMute,
  onCloseWidget
}): Promise<HTMLSpanElement> => {
  startRecordButton.onclick = () => {
    onStartRecord(true);
    startRecordButton.remove();
    recordWrapper.appendChild(stopRecordButton);
    recordingButton.style.display = "inline";
  };
  stopRecordButton.onclick = () => {
    onStopRecord(true);
    resetWidget();
  };
  maskStartButton.onclick = () => {
    onStartMask(true);
    maskStartButton.remove();
    maskWrapper.appendChild(maskStopButton);
  };
  maskStopButton.onclick = () => {
    onStopMask(true);
    maskStopButton.remove();
    maskWrapper.appendChild(maskStartButton);
  };
  muteStartButton.onclick = () => {
    onStartMute(true);
    muteStartButton.remove();
    muteWrapper.appendChild(muteStopButton);
  };
  muteStopButton.onclick = () => {
    onStopMute(true);
    muteStopButton.remove();
    muteWrapper.appendChild(muteStartButton);
  };
  closeButton.onclick = () => {
    onCloseWidget(true);
    closeRecordWidget();
  };
  return await appendRecordWrapperToBody().then(response => response);
};
export const resetWidget = (): void => {
  stopRecordButton.remove();
  recordWrapper.appendChild(startRecordButton);
  recordingButton.style.display = "";
};
export const closeRecordWidget = (): void => {
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
  recordingButton.style.display = "";
};
