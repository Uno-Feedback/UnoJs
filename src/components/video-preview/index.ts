import initialModal, {createTitle, showModal} from "../modal";
import {lang} from "../../shared/langs";
import {AppendVideoToModalFunction} from "./type";
import {
  brushIcon,
  confirmIcon,
  fullscreenIcon,
  pauseIcon,
  playIcon,
  timeline35,
  timeline60,
  videoPoster,
  volumeIcon,
  volumeOffIcon
} from "../../assets/svg";
import openReportFormModal from "../report-form";

function formatBytes(bytes: number, decimals = 2): string {
  if (!+bytes) return "0 Bytes";

  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ["Bytes", "KiB", "MiB", "GiB", "TiB", "PiB", "EiB", "ZiB", "YiB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`;
}

function createName(): string {
  const now = new Date();
  const yyyy = now.getFullYear();
  let mm: number | string = now.getMonth() + 1; // Months start at 0
  let dd: number | string = now.getDate();
  let HH: number | string = now.getHours();
  let MM: number | string = now.getMinutes();
  let SS: number | string = now.getSeconds();

  if (dd < 10) dd = `0${dd}`;
  if (mm < 10) mm = `0${mm}`;
  if (HH < 10) HH = `0${HH}`;
  if (MM < 10) MM = `0${MM}`;
  if (SS < 10) SS = `0${SS}`;

  return `${yyyy}${mm}${dd}${HH}${MM}${SS}`;
}

function blobToBase64(blob: Blob) {
  return new Promise((resolve, _) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result);
    reader.readAsDataURL(blob);
  });
}

/* todo: external Package that most customize */
async function getBlobDuration(blob: Blob): Promise<number> {
  const tempVideoEl = document.createElement("video");

  const durationP = new Promise(resolve => {
    tempVideoEl.addEventListener("loadedmetadata", () => {
      // Chrome bug: https://bugs.chromium.org/p/chromium/issues/detail?id=642012
      if (tempVideoEl.duration === Infinity) {
        tempVideoEl.currentTime = Number.MAX_SAFE_INTEGER;
        tempVideoEl.ontimeupdate = () => {
          tempVideoEl.ontimeupdate = null;
          resolve(tempVideoEl.duration);
          tempVideoEl.currentTime = 0;
        };
      }
      // Normal behavior
      else resolve(tempVideoEl.duration as number);
    });
  });

  tempVideoEl.src =
    typeof blob === "string" || blob instanceof String
      ? (blob as unknown as string)
      : (window.URL.createObjectURL(blob) as string);

  return (durationP as unknown as number) ?? 0;
}

/* todo: clean this function */
function secondToTimestamp(second: number): string {
  let hours: string | number = Math.floor(second / 3600);
  let minutes: string | number = Math.floor((second - hours * 3600) / 60);
  let seconds: string | number = second - hours * 3600 - minutes * 60;
  if (minutes < 10) minutes = "0" + minutes;
  if (seconds < 10) seconds = "0" + seconds;
  return minutes + ":" + seconds;
}

// Elements
const videoWrapper = document.createElement("div");
const videoElement = document.createElement("video");
const videoController = document.createElement("div");
const videoTimeline = document.createElement("div");
const videoTimeline35 = document.createElement("div");
const videoTimeline60 = document.createElement("div");
const videoTimeWrapper = document.createElement("div");
const currentTime = document.createElement("span");
const videoTime = document.createElement("span");
const controllerActionWrapper = document.createElement("div");
const playPauseButton = document.createElement("span");
const fullScreenButton = document.createElement("span");
const middleControllerWrapper = document.createElement("div");
const brush = document.createElement("span");
const volume = document.createElement("span");
const footer = document.createElement("div");
const confirmationButton = document.createElement("button");

let isMute = false;
let isPlaying = false;

const appendVideoToModal: AppendVideoToModalFunction = (fileName, fileSize) => {
  initialModal(createTitle(`${lang.en.videoPreview.title} <small>(${fileName} - ${fileSize})</small>`), () => {}).then(
    modalContent => {
      modalContent.appendChild(videoWrapper);
      showModal();
    }
  );
};

const destroyVideoElements = async (): Promise<void> => {
  videoWrapper.remove();
  videoElement.remove();
  videoController.remove();
  videoTimeline.remove();
  videoTimeline35.remove();
  videoTimeline60.remove();
  videoTimeWrapper.remove();
  currentTime.remove();
  videoTime.remove();
  controllerActionWrapper.remove();
  playPauseButton.remove();
  fullScreenButton.remove();
  middleControllerWrapper.remove();
  brush.remove();
  volume.remove();
  footer.remove();
  confirmationButton.remove();
};
const goToNextStep = (recordedBlob: Blob): void => {
  destroyVideoElements().then(() => {
    openReportFormModal(recordedBlob);
  });
};
const toggleMute = (): void => {
  if (isMute) {
    volume.innerHTML = volumeIcon;
    isMute = false;
    videoElement.muted = false;
    return;
  }
  volume.innerHTML = volumeOffIcon;
  videoElement.muted = true;
  isMute = true;
};
const togglePlay = (): void => {
  if (isPlaying) {
    playPauseButton.innerHTML = playIcon;
    isPlaying = false;
    videoElement.pause();
    return;
  }
  playPauseButton.innerHTML = pauseIcon;
  videoElement.play().then(() => (isPlaying = true));
};
const resetController = (): void => {
  volume.innerHTML = volumeIcon;
  playPauseButton.innerHTML = playIcon;
  videoElement.muted = false;
  isMute = false;
  isPlaying = false;
  videoElement.load();
  videoElement.controls = false;
};

const initialInnerElements = async (recordedBlob: Blob): Promise<void> => {
  videoWrapper.classList.add("uno-video-wrapper");
  videoElement.classList.add("uno-video-element");
  blobToBase64(recordedBlob).then(url => {
    // Video URL
    if (typeof url === "string") {
      videoElement.src = url;
    }
  });
  // SVG Poster
  const svg = new DOMParser().parseFromString(videoPoster, "text/xml");
  const svgData = new XMLSerializer().serializeToString(svg);
  videoElement.poster = "data:image/svg+xml;base64," + btoa(svgData);
  // Video Config
  videoElement.autoplay = false;
  videoElement.controls = false;
  videoElement.muted = false;
  videoElement.width = 750;
  videoElement.onended = () => resetController();
  videoElement.onplay = () => {
    videoElement.controls = true;
  };
  // Append video to wrapper element
  videoWrapper.appendChild(videoElement);
  // Video Timeline
  videoTimeline.classList.add("uno-video-controller-timeline");
  // Timeline Progressbar
  videoTimeline35.classList.add("uno-video-controller-timeline-35");
  videoTimeline60.classList.add("uno-video-controller-timeline-60");
  videoTimeline35.innerHTML = timeline35;
  videoTimeline60.innerHTML = timeline60;
  videoTimeline.appendChild(videoTimeline35);
  videoTimeline.appendChild(videoTimeline60);
  // Append Timeline
  videoController.appendChild(videoTimeline);
  // Timeline Time
  /* todo: cleanup */
  videoTimeWrapper.classList.add("uno-video-time");
  currentTime.classList.add("uno-video-time-current");
  currentTime.innerText = "00:00";
  videoTimeWrapper.appendChild(currentTime);
  videoTime.classList.add("uno-video-time-total");
  videoTime.innerText = "00:00";
  getBlobDuration(recordedBlob).then((duration: number) => {
    videoTime.innerText = secondToTimestamp(Math.floor(duration));
  });
  videoTimeWrapper.appendChild(videoTime);
  // Append Time Wrapper
  videoController.appendChild(videoTimeWrapper);
  // Video Controller
  videoController.classList.add("uno-video-controller");
  /*
   * Action Controller
   * */
  controllerActionWrapper.classList.add("uno-video-action-controller");
  // play
  playPauseButton.innerHTML = playIcon;
  playPauseButton.classList.add("uno-video-action-play");
  playPauseButton.onclick = () => togglePlay();
  controllerActionWrapper.appendChild(playPauseButton);
  // middle control
  middleControllerWrapper.classList.add("uno-video-action-middle");
  // brush
  brush.innerHTML = brushIcon;
  brush.classList.add("uno-video-action-brush");
  middleControllerWrapper.appendChild(brush);
  // volume
  volume.innerHTML = volumeIcon;
  volume.classList.add("uno-video-action-volume");
  volume.onclick = () => toggleMute();
  middleControllerWrapper.appendChild(volume);
  controllerActionWrapper.appendChild(middleControllerWrapper);
  // fullscreen
  fullScreenButton.innerHTML = fullscreenIcon;
  fullScreenButton.classList.add("uno-video-action-fullscreen");
  fullScreenButton.onclick = () => {
    videoElement.requestFullscreen();
  };
  videoController.appendChild(controllerActionWrapper);
  controllerActionWrapper.appendChild(fullScreenButton);

  videoWrapper.appendChild(videoController);
  // Confirm Button
  footer.classList.add("uno-video-footer");
  confirmationButton.classList.add("uno-video-confirmation");
  confirmationButton.innerHTML = `${lang.en.videoPreview.confirm}<span>${confirmIcon}</span>`;
  confirmationButton.onclick = () => goToNextStep(recordedBlob);
  footer.appendChild(confirmationButton);
  videoWrapper.appendChild(footer);
};

const videoPreview = (recordedBlob: Blob) => {
  const fileSize = formatBytes(recordedBlob.size, 2);
  const fileName = createName();

  initialInnerElements(recordedBlob).then(() => {
    appendVideoToModal(fileName, fileSize);
  });
};

export default videoPreview;
