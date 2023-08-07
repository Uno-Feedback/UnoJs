var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { maskIcon, stopMaskIcon, muteIcon, recordIcon, recordingIcon, stopRecordIcon, unmuteIcon, crossIcon } from "../../assets/svg";
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
    maskStopButton.innerHTML = stopMaskIcon;
    // Close Element
    closeButton.classList.add("uno-close");
    closeButton.innerHTML = crossIcon;
    wrapper.appendChild(closeButton);
};
const appendRecordWrapperToBody = () => new Promise(resolve => {
    initialInnerElements();
    document.body.appendChild(wrapper);
    resolve(counter);
});
export const openRecordWidget = ({ startRecord, stopRecord, startMask, stopMask, startMute, stopMute, closeWidget }) => __awaiter(void 0, void 0, void 0, function* () {
    startRecordButton.onclick = () => {
        startRecord(true);
        startRecordButton.remove();
        recordWrapper.appendChild(stopRecordButton);
        recordingButton.style.display = "inline";
    };
    stopRecordButton.onclick = () => {
        stopRecord(true);
        stopRecordButton.remove();
        recordWrapper.appendChild(startRecordButton);
        recordingButton.style.display = "";
    };
    maskStartButton.onclick = () => {
        startMask(true);
        maskStartButton.remove();
        maskWrapper.appendChild(maskStopButton);
    };
    maskStopButton.onclick = () => {
        stopMask(true);
        maskStopButton.remove();
        maskWrapper.appendChild(maskStartButton);
    };
    muteStartButton.onclick = () => {
        startMute(true);
        muteStartButton.remove();
        muteWrapper.appendChild(muteStopButton);
    };
    muteStopButton.onclick = () => {
        stopMute(true);
        muteStopButton.remove();
        muteWrapper.appendChild(muteStartButton);
    };
    closeButton.onclick = () => {
        closeWidget(true);
        closeRecordWidget();
    };
    return yield appendRecordWrapperToBody().then(response => response);
});
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
    recordingButton.style.display = "";
};
//# sourceMappingURL=index.js.map