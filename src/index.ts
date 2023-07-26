interface unoJSBuilderOptions {
  user: User;
  autoSecretKey?: string;
  callbacks: Callbacks;
}

interface User {
  fullName: string;
  email: string;
  avatar?: string;
}

interface Time {
  second: number;
  minute: number;
  hour: number;
}

interface Callbacks {
  onOpenWidget: () => void;
  onCloseWidget: () => void;
  onStartMask: () => void;
  onStopMask: () => void;
  onStartTimer: (time: Time) => void;
  onStopTimer: () => void;
  onStartRecording: () => void;
  onStopRecording: () => void;
  onSubmit: () => void;
  onError: () => void;
}

interface SubscriptionData {
  apiKey: string;
  requestUrl: string;
}

class unoJSBuilder {
  private options: unoJSBuilderOptions | null;
  private subscriptionData: SubscriptionData | null;
  private startButton: HTMLElement | null;
  private autoSecretKey: string | null | undefined;

  constructor() {
    this.options = null;
    this.subscriptionData = null;
    this.startButton = null;
    this.autoSecretKey = null;
  }

  initialize(
    startButtonId: string,
    subscriptionData: SubscriptionData,
    options: unoJSBuilderOptions
  ) {
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
    if (!options?.autoSecretKey) {
      console.warn("[uno-js] Auto secret data attribute not set.");
    }

    console.info("[uno-js] Package initialized!");

    this.options = options;
    this.autoSecretKey = options.autoSecretKey;
    this.subscriptionData = subscriptionData;
    this.startButton = document.getElementById(startButtonId);
    if (this.startButton)
      this.startButton.addEventListener("click", () => console.log("click"));
  }
}

const unoJS = new unoJSBuilder();
export default unoJS;
