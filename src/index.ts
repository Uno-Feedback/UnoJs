class unoJSBuilder {
  private options: null;
  private subscriptionData: null;
  private startButton: HTMLElement;
  private autoSecretKey: null;

  constructor() {
    this.options = null;
    this.subscriptionData = null;
    this.startButton = null;
    this.autoSecretKey = null;
  }

  initialize(startButtonId, subscriptionData, options) {
    if (!subscriptionData) {
      console.error("[uno-js] Subscription data not set.");
      return;
    }
    if (!startButtonId) {
      console.error("[uno-js] Start button not set.");
      return;
    }
    if (!options?.user) {
      console.error("[uno-js] User data not set.");
      return;
    }
    if (!options?.autoSecretDataAttribute) {
      console.warn("[uno-js] Auto secret data attribute not set.");
    }

    console.info("[uno-js] Package initialized!");

    this.options = options;
    this.autoSecretKey = options?.autoSecretKey;
    this.subscriptionData = subscriptionData;
    this.startButton = document.getElementById(startButtonId);
    if (this.startButton)
      this.startButton.addEventListener("click", () => console.log("click"));
  }
}

const unoJS = new unoJSBuilder();
export default unoJS;
