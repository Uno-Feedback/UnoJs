/**
 * This file is the main entry point for the uno-js library.
 *
 * It provides the following functions:
 *
 * - `initialize`: This function is used to initialize the library. It takes three arguments:
 * `startButtonId`: The ID of the HTML element that will be used as the start button.
 * `subscriptionData`: An object that contains the subscription data, such as the request URL and API key.
 * `options`: An object that contains the user data, such as the full name, email, and avatar.
 *
 * - `startRecord`: This function is to start recording.
 * - `stopRecord`: This function is to stop recording.
 * - `startMask`: This function is to start the screen mask.
 * - `stopMask`: This function is to stop the screen mask.
 * - `startMute`: This function is to start muting the microphone.
 * - `stopMute`: This function is to stop muting the microphone.
 * - `closeWidget`: This function is to close the widget.
 *
 * For more information, please see the [uno-js documentation](https://github.com/Uno-Feedback/UnoJs#readme).
 */

import {InitializeFunction, ValidationFunction} from "./types";
import {openRecordWidget} from "./components/recordWidget";
import ScreenMask from "./components/screenMask";
import {runTimer, stopTimer} from "./components/timer";
import {Time} from "./components/timer/type";
import state from "./state";
import Observable from "./components/observable";
import {endSecret, startSecret} from "./components/autoSecret";
import MediaStreamRecorder from "./components/mediaStreamRecorder";

class UnoJSBuilder {
  private screenMask;
  private screenRecorder: MediaStreamRecorder | null;
  private timerWrapper: HTMLElement | null;
  private audio: boolean;

  constructor() {
    this.screenMask = new ScreenMask();
    this.screenRecorder = null;
    this.timerWrapper = null;
    this.audio = true;
  }

  validateInitialization: ValidationFunction = options => {
    if (!options.subscriptionData) {
      console.error("[uno-js] Subscription data not set.");
      return false;
    }
    if (!options.subscriptionData.requestUrl) {
      console.error("[uno-js] Request url not set.");
      return false;
    }
    if (!options.subscriptionData.requestUrl) {
      console.error("[uno-js] Api key not set.");
      return false;
    }
    if (!options.startButtonId) {
      console.error("[uno-js] Start button not set.");
      return false;
    }
    if (!options?.user) {
      console.error("[uno-js] User data not set.");
      return false;
    }
    if (!options?.autoSecretKey) console.warn("[uno-js] Auto secret data attribute not set.");
    return true;
  };

  startRecord = (): void => {
    if (!this.screenRecorder) return;
    Observable.subscribe("clearElements", this.closeWidget);
    this.screenRecorder
      .start()
      .then(record => {
        if (record === "stopped") return;
        console.info("[uno-js] Record started");
        startSecret();
        runTimer(this.timerWrapper, this.observeTime);
      })
      .catch(error => {
        this.closeWidget();
        console.error(`[uno-js] Error while starting record: ${error}`);
      });
  };

  stopRecord = () => {
    if (!this.screenRecorder) return;
    console.info("[uno-js] Record stopped!");
    this.screenRecorder.stopRecording();
    stopTimer();
    this.screenRecorder = null;
  };

  startMask = () => {
    this.screenMask.start();
  };

  stopMask = () => {
    this.screenMask.stop();
  };

  startMute = () => {
    console.info("[uno-js] Mute started!");
    /* todo mute only before start recording */
    this.audio = false;
  };

  stopMute = () => {
    console.info("[uno-js] Mute stopped!");
    this.audio = true;
  };

  closeWidget = () => {
    console.info("[uno-js] Widget closed!");
    this.stopMask();
    this.stopRecord();
    endSecret();
    stopTimer();
  };

  observeTime({minutes}: Time) {
    if (minutes === 1) {
      this.stopRecord();
    }
  }

  initialize: InitializeFunction = options => {
    if (!this.validateInitialization(options)) return;

    console.info("[uno-js] Package initialized!");

    const startButton = document.getElementById(options.startButtonId);

    state.fullName = options.user.fullName;
    state.email = options.user.email;
    state.avatar = options.user.avatar;
    state.autoSecretDataAttribute = options.autoSecretKey ?? null;
    state.requestUrl = options.subscriptionData.requestUrl;
    state.apiKey = options.subscriptionData.apiKey;

    this.screenRecorder = new MediaStreamRecorder({
      displayMediaConstraints: {
        audio: this.audio,
        video: true
      },
      userMediaConstraints: {
        audio: {
          sampleSize: 100,
          frameRate: {max: 30},
          channelCount: 2
        }
      },
      mimeType: "video/webm"
    });

    if (startButton)
      startButton.addEventListener("click", () => {
        openRecordWidget({
          startRecord: this.startRecord,
          stopRecord: this.stopRecord,
          startMask: this.startMask,
          stopMask: this.stopMask,
          startMute: this.startMute,
          stopMute: this.stopMute,
          closeWidget: this.closeWidget
        }).then(response => {
          this.timerWrapper = response;
        });
      });
  };
}

const unoJS = new UnoJSBuilder();
export default unoJS;
