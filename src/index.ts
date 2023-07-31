import {
  Options,
  SubscriptionData,
  InitializeFunction,
  ValidationFunction,
} from "./types";
import { openRecordWidget } from "./components/recordWidget";

class UnoJSBuilder {
  private options: Options | null;
  private subscriptionData: SubscriptionData | null;
  private startButton: HTMLElement | null;
  private autoSecretKey: string | null;

  constructor() {
    this.options = null;
    this.subscriptionData = null;
    this.startButton = null;
    this.autoSecretKey = null;
  }

  validateInitialization: ValidationFunction = (
    startButtonId,
    subscriptionData,
    options
  ) => {
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
    if (!options?.autoSecretKey) {
      console.warn("[uno-js] Auto secret data attribute not set.");
    }
    return true;
  };

  startRecord = () => {
    console.log("start record");
  };
  stopRecord = () => {
    console.log("stop record");
  };
  startMask = () => {
    console.log("start mask");
  };
  stopMask = () => {
    console.log("stop mask");
  };
  closeWidget = () => {
    console.log("close widget");
  };

  initialize: InitializeFunction = (
    startButtonId,
    subscriptionData,
    options
  ) => {
    if (!this.validateInitialization(startButtonId, subscriptionData, options))
      return;

    console.info("[uno-js] Package initialized!");

    this.options = options;
    this.autoSecretKey = options.autoSecretKey ?? null;
    this.subscriptionData = subscriptionData;
    this.startButton = document.getElementById(startButtonId);

    if (this.startButton)
      this.startButton.addEventListener("click", () =>
        openRecordWidget(
          this.startRecord,
          this.stopRecord,
          this.startMask,
          this.stopMask,
          this.closeWidget
        ).then((response) => {
          console.log({ response });
        })
      );
  };
}

const unoJS = new UnoJSBuilder();
export default unoJS;
