/**
 *
 * Implementation of a record widget with various controls.
 *
 * The `onCloseWidget` function is called when the user clicks the close button.
 */

// Import necessary types from the "type" module.
import {OpenRecordWidgetFunction, Tab} from "./types";
import {cameraIcon, crossIcon, micIcon, noteIcon, videoCameraIcon} from "../../assets/svg";
import initialVideoElements, {
  counter,
  maskStartButton,
  maskStopButton,
  maskWrapper,
  muteStartButton,
  muteStopButton,
  muteWrapper,
  recordingButton,
  recordWrapper,
  startRecordButton,
  stopRecordButton,
  timerWrapper
} from "./video";
import {lang} from "../../shared/langs";

// Widget Element
const widget: HTMLDivElement = document.createElement("div");
// Wrapper Element
const wrapper: HTMLDivElement = document.createElement("div");
// Title Element
const title: HTMLDivElement = document.createElement("p");
// Tabs Wrapper Element
const tabsWrapper: HTMLDivElement = document.createElement("div");
// Close Element
const closeButton = document.createElement("span");

const initialTabs = () => {
  // Tab Element
  const tab: HTMLDivElement = document.createElement("div");
  tab.classList.add("uno-tab");
  // Icon Element
  const icon: HTMLSpanElement = document.createElement("span");
  icon.classList.add("uno-tab-icon");
  // Text Element
  const text: HTMLSpanElement = document.createElement("span");
  text.classList.add("uno-tab-text");

  const tabs: Tab[] = [
    {title: lang.en.widget.video, icon: videoCameraIcon},
    {title: lang.en.widget.image, icon: cameraIcon},
    {title: lang.en.widget.voice, icon: micIcon},
    {title: lang.en.widget.note, icon: noteIcon}
  ];
  tabs.map((tabInfo, index) => {
    const cloneTab = tab.cloneNode(true) as HTMLElement;
    if (index === 0) cloneTab.classList.add("active");
    const cloneIcon = icon.cloneNode(true) as HTMLSpanElement;
    const cloneText = text.cloneNode(true) as HTMLSpanElement;
    cloneIcon.innerHTML = tabInfo.icon;
    cloneText.innerText = tabInfo.title;
    cloneTab.appendChild(cloneIcon);
    cloneTab.appendChild(cloneText);
    tabsWrapper.appendChild(cloneTab);
  });
};

const initialInnerElements = (): void => {
  // Widget
  widget.setAttribute("id", "uno-widget");
  widget.classList.add("uno-widget");
  // Title
  title.classList.add("uno-widget-title");
  title.innerText = lang.en.widget.title;
  widget.appendChild(title);
  // Tabs
  tabsWrapper.classList.add("uno-tabs-wrapper");
  initialTabs();
  widget.appendChild(tabsWrapper);
  // Close Element
  closeButton.classList.add("uno-close");
  closeButton.innerHTML = crossIcon;
  widget.appendChild(closeButton);
  // Wrapper
  wrapper.classList.add("uno-tab-content");
  widget.appendChild(wrapper);
  // Initial Video Elements
  initialVideoElements(wrapper);
};
const appendRecordWrapperToBody = (): Promise<HTMLSpanElement> =>
  new Promise(resolve => {
    initialInnerElements();
    document.body.appendChild(widget);
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
  widget.remove();
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
  tabsWrapper.innerHTML = "";
  tabsWrapper.remove();
  title.remove();
  recordingButton.style.display = "";
};
