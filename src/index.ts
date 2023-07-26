import {
  Options,
  SubscriptionData,
  InitializeFunction,
  ValidationFunction,
} from "./types";

class UnoJSBuilder {
  private options: Options | null;
  private subscriptionData: SubscriptionData | null;
  private startButton: HTMLElement | null;
  private autoSecretKey: string | null | undefined;

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

  initialize: InitializeFunction = (
    startButtonId,
    subscriptionData,
    options
  ) => {
    if (!this.validateInitialization(startButtonId, subscriptionData, options))
      return;

    console.info("[uno-js] Package initialized!");

    this.options = options;
    this.autoSecretKey = options.autoSecretKey;
    this.subscriptionData = subscriptionData;
    this.startButton = document.getElementById(startButtonId);

    if (this.startButton)
      this.startButton.addEventListener("click", () => console.log("click"));
  };
}

const unoJS = new UnoJSBuilder();
export default unoJS;
