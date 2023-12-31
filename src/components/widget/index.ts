/**
 *
 * Implementation of a record widget with various controls.
 *
 * The `onCloseWidget` function is called when the user clicks the close button.
 */

// Import the necessary types from the "type" module.
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
import optionsState from "../../shared/states";

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
  tabs.forEach((tabInfo, index) => {
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
  if (optionsState.isExtension) widget.classList.add("uno-widget-extension");
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
  startRecordButton.onclick = (): void => {
    onStartRecord(true);
  };
  stopRecordButton.onclick = (): void => {
    onStopRecord(true);
    resetWidget();
  };
  maskStartButton.onclick = (): void => {
    onStartMask(true);
    maskStartButton.remove();
    maskWrapper.appendChild(maskStopButton);
  };
  maskStopButton.onclick = (): void => {
    onStopMask(true);
    maskStopButton.remove();
    maskWrapper.appendChild(maskStartButton);
  };
  muteStartButton.onclick = (): void => {
    onStartMute(true);
    muteStartButton.remove();
    muteWrapper.appendChild(muteStopButton);
  };
  muteStopButton.onclick = (): void => {
    onStopMute(true);
    muteStopButton.remove();
    muteWrapper.appendChild(muteStartButton);
  };
  closeButton.onclick = (): void => {
    onCloseWidget(true);
    closeRecordWidget();
  };
  return await appendRecordWrapperToBody().then(response => response);
};
/* todo: find better name for this fn */
export const checkRecordState = (recordIsStarted: boolean): void => {
  if (!recordIsStarted) return;
  startRecordButton.remove();
  recordWrapper.appendChild(stopRecordButton);
  recordingButton.style.display = "inline";
  widget.classList.add("recording");
};
export const resetWidget = (): void => {
  stopRecordButton.remove();
  recordWrapper.appendChild(startRecordButton);
  recordingButton.style.display = "";
  setTimeout(() => {
    widget.classList.remove("recording");
  }, 500);
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
