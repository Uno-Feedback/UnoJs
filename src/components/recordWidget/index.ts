import { OpenRecordWidgetFunction } from "./types";

const startRecordButton = document.createElement("span");
const stopRecordButton = document.createElement("span");
const maskStartButton = document.createElement("span");
const maskStopButton = document.createElement("span");
const closeButton = document.createElement("span");

export const openRecordWidget: OpenRecordWidgetFunction = async (
  startRecord,
  stopRecord,
  startMask,
  stopMask,
  closeWidget
) => {
  console.log("Open widget");
  startRecordButton.onclick = () => {
    startRecord(true);
  };
  stopRecordButton.onclick = () => {
    stopRecord(true);
  };
  maskStartButton.onclick = () => {
    startMask(true);
  };
  maskStopButton.onclick = () => {
    stopMask(true);
  };
  closeButton.onclick = () => {
    closeWidget(true);
  };
  return new Promise((resolve) => {
    resolve("Widget opened");
  });
};
export const closeRecordWidget = () => {
  console.log("Close widget");
};
