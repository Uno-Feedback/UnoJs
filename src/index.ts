import { Options, SubscriptionData, InitializeFunction, ValidationFunction } from "./types";
import { openRecordWidget } from "./components/recordWidget";
import ScreenMask from "./components/screenMask";
import { runTimer, stopTimer } from "./components/timer";
import { Time } from "./components/timer/type";

class UnoJSBuilder {
    private options: Options | null;
    private screenMask;
    private timerWrapper: HTMLElement | null;

    constructor() {
        this.options = null;
        this.screenMask = new ScreenMask();
        this.timerWrapper = null;
    }

    private validateInitialization: ValidationFunction = (options) => {
        if (!options.subscriptionData) {
            console.error("[uno-js] Subscription data not set.");
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
        if (!options?.autoSecretKey)
            console.warn("[uno-js] Auto secret data attribute not set.");
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
        this.screenMask.start();
    };

    stopMask = () => {
        this.screenMask.removeAllElements();
        this.screenMask.stop();
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

    observeTime({ seconds }: Time) {
        if (seconds === 30) {
            this.stopRecord();
        }
    }

    initialize: InitializeFunction = (options) => {
        if (!this.validateInitialization(options)) return;
        console.info("[uno-js] Package initialized!");
        this.options = options;
        let startButton = document.getElementById(options.startButtonId);

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
