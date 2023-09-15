/**
 * This file is the main entry point for the uno-js library.
 *
 * It provides the following functions:
 *
 * - `initialize`: This function is used to initialize the library. It takes three arguments:
 *   `startButtonId`: The ID of the HTML element that will be used as the start button.
 *   `subscriptionData`: An object that contains the subscription data, such as the request URL and API key.
 *   `options`: An object that contains the user data, such as the full name, email, and avatar.
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

import {Options} from "./types";
import {closeRecordWidget, openRecordWidget, resetWidget} from "./components/widget";
import ScreenMask from "./components/screenMask";
import {runTimer, stopTimer} from "./components/timer";
import {Time} from "./components/timer/type";
import optionsState from "./shared/states";
import Observable from "./components/observable";
import {endSecret, startSecret} from "./components/autoSecret";
import MediaStreamRecorder from "./components/mediaStreamRecorder";
import {AUDIO_CHANNEL_COUNT, AUDIO_SAMPLE_SIZE, MAX_FRAME_RATE} from "./shared/constants";

/**
 * The UnoJSBuilder class is the main entry point for the uno-js package.
 * It provides methods for starting and stopping recording, as well as for managing the mask and mute features.
 */

class UnoJSBuilder {
  private screenMask;
  private screenRecorder: MediaStreamRecorder | null;
  private timerWrapper: HTMLElement | null;
  private audio: boolean;
  private maskIsRunning: boolean;
  private recordIsStarted: boolean;

  constructor() {
    this.screenMask = new ScreenMask();
    this.screenRecorder = null;
    this.timerWrapper = null;
    this.audio = true;
    this.maskIsRunning = false;
    this.recordIsStarted = false;
  }

  /**
   Validates the initialization options.
   @param options The initialization options.
   @returns Whether the options are valid.
   */

  validateInitialization = (options: Options): boolean => {
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

    this.screenRecorder
      .start()
      .then(record => {
        if (!record) {
          resetWidget();
          return;
        }
        startSecret();
        this.setRecordState(true);
        runTimer(this.timerWrapper, this.observeTime);
        console.info("[uno-js] Record started");
      })
      .catch(error => {
        this.closeWidget();
        this.setRecordState(false);
        console.error(`[uno-js] Error while starting record: ${error}`);
      });
    Observable.subscribe("closeWidget", this.closeWidget);
    Observable.subscribe("setRecordState", this.setRecordState);
  };

  stopRecord = () => {
    if (!this.screenRecorder || !this.recordIsStarted) return;
    console.info("[uno-js] Record stopped!");
    this.screenRecorder.stopRecording();
    stopTimer();
    this.setRecordState(false);
  };

  startMask = () => {
    this.screenMask.start();
    this.maskIsRunning = true;
    console.info("[uno-js] Mask started!");
  };

  stopMask = () => {
    if (!this.maskIsRunning) return;
    this.screenMask.stop();
    this.maskIsRunning = false;
    console.info("[uno-js] Mask stopped!");
  };

  startMute = () => {
    if (this.recordIsStarted) return;
    /* todo mute only before start recording */
    this.audio = false;
    console.info("[uno-js] Mute started!");
  };

  stopMute = () => {
    this.audio = true;
    console.info("[uno-js] Mute stopped!");
  };

  closeWidget = () => {
    this.stopMask();
    this.stopRecord();
    endSecret();
    stopTimer();
    closeRecordWidget();
    console.info("[uno-js] Widget closed!");
  };

  setRecordState = (state: boolean) => {
    console.log({state});
    this.recordIsStarted = state;
  };

  observeTime({minutes}: Time) {
    if (minutes === optionsState.videoMaxLength) {
      this.stopRecord();
    }
  }

  initialize = (options: Options): void => {
    if (!this.validateInitialization(options)) return;

    const startButton = document.getElementById(options.startButtonId);

    // TODO: we should be encapsulated this assignments
    optionsState.user = options.user;
    optionsState.autoSecretKey = options.autoSecretKey ?? undefined;
    optionsState.subscriptionData = options.subscriptionData;
    options.videoMaxLength ??= options.videoMaxLength;

    this.screenRecorder = new MediaStreamRecorder({
      displayMediaConstraints: {
        audio: this.audio,
        video: true
      },
      userMediaConstraints: {
        audio: {
          sampleSize: AUDIO_SAMPLE_SIZE,
          frameRate: {max: MAX_FRAME_RATE},
          channelCount: AUDIO_CHANNEL_COUNT
        }
      },
      mimeType: "video/webm"
    });

    if (startButton)
      startButton.addEventListener("click", () => {
        openRecordWidget({
          onStartRecord: this.startRecord,
          onStopRecord: this.stopRecord,
          onStartMask: this.startMask,
          onStopMask: this.stopMask,
          onStartMute: this.startMute,
          onStopMute: this.stopMute,
          onCloseWidget: this.closeWidget
        }).then(response => {
          this.timerWrapper = response;
        });
      });

    console.info("[uno-js] Package initialized!"); //TODO: after develop these methods should be removed
  };
}

const unoJS = new UnoJSBuilder();
export default unoJS;
