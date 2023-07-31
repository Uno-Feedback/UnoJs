import {Options, SubscriptionData, InitializeFunction, ValidationFunction} from "./types";
import {openRecordWidget} from "./components/recordWidget";
import ScreenMask from "./components/screenMask";
import {runTimer, stopTimer} from "./components/timer";
import {Time} from "./components/timer/type";

class UnoJSBuilder {
  private options: Options | null;
  private subscriptionData: SubscriptionData | null;
  private startButton: HTMLElement | null;
  private autoSecretKey: string | null;
  private screenMask;
  private timerWrapper: HTMLElement | null;

  constructor() {
    this.options = null;
    this.subscriptionData = null;
    this.startButton = null;
    this.autoSecretKey = null;
    this.screenMask = new ScreenMask();
    this.timerWrapper = null;
  }

  validateInitialization: ValidationFunction = (startButtonId, subscriptionData, options) => {
    if (!subscriptionData) {
      console.error("[uno-js] Subscription data not set.");
      return false;
    }
    if (!startButtonId) {
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

  startRecord = () => {
    console.log("start record");
    runTimer(this.timerWrapper, this.observeTime.bind(this));
  };
  stopRecord = () => {
    console.log("stop record");
    stopTimer();
  };
  startMask = () => {
    this.screenMask.init(true);
  };
  stopMask = () => {
    this.screenMask.removeAllElements();
    this.screenMask.init(false);
  };
  startMute = () => {
    console.log("stop mute");
  };
  stopMute = () => {
    console.log("stop mute");
  };
  closeWidget = () => {
    console.info("[uno-js] Widget closed!");
    this.stopMask();
    this.stopRecord();
  };

  observeTime({seconds}: Time) {
    if (seconds === 30) {
      this.stopRecord();
    }
  }

  initialize: InitializeFunction = (startButtonId, subscriptionData, options) => {
    if (!this.validateInitialization(startButtonId, subscriptionData, options)) return;

    console.info("[uno-js] Package initialized!");

    this.options = options;
    this.autoSecretKey = options.autoSecretKey ?? null;
    this.subscriptionData = subscriptionData;
    this.startButton = document.getElementById(startButtonId);

    if (this.startButton)
      this.startButton.addEventListener("click", () => {
        // this.startRecord, this.stopRecord, this.startMask, this.stopMask, this.closeWidget
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
