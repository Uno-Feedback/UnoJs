import { openRecordWidget } from "./components/recordWidget";
import ScreenMask from "./components/screenMask";
import { runTimer, stopTimer } from "./components/timer";
class UnoJSBuilder {
    constructor() {
        this.validateInitialization = (startButtonId, subscriptionData, options) => {
            if (!subscriptionData) {
                console.error("[uno-js] Subscription data not set.");
                return false;
            }
            if (!startButtonId) {
                console.error("[uno-js] Start button not set.");
                return false;
            }
            if (!(options === null || options === void 0 ? void 0 : options.user)) {
                console.error("[uno-js] User data not set.");
                return false;
            }
            if (!(options === null || options === void 0 ? void 0 : options.autoSecretKey))
                console.warn("[uno-js] Auto secret data attribute not set.");
            return true;
        };
        this.startRecord = () => {
            console.log("start record");
            runTimer(this.timerWrapper, this.observeTime.bind(this));
        };
        this.stopRecord = () => {
            console.log("stop record");
            stopTimer();
        };
        this.startMask = () => {
            this.screenMask.start();
        };
        this.stopMask = () => {
            this.screenMask.removeAllElements();
            this.screenMask.stop();
        };
        this.startMute = () => {
            console.log("stop mute");
        };
        this.stopMute = () => {
            console.log("stop mute");
        };
        this.closeWidget = () => {
            console.info("[uno-js] Widget closed!");
            this.stopMask();
            this.stopRecord();
        };
        this.initialize = (startButtonId, subscriptionData, options) => {
            var _a;
            if (!this.validateInitialization(startButtonId, subscriptionData, options))
                return;
            console.info("[uno-js] Package initialized!");
            this.options = options;
            this.autoSecretKey = (_a = options.autoSecretKey) !== null && _a !== void 0 ? _a : null;
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
        this.options = null;
        this.subscriptionData = null;
        this.startButton = null;
        this.autoSecretKey = null;
        this.screenMask = new ScreenMask();
        this.timerWrapper = null;
    }
    observeTime({ seconds }) {
        if (seconds === 30) {
            this.stopRecord();
        }
    }
}
const unoJS = new UnoJSBuilder();
export default unoJS;
//# sourceMappingURL=index.js.map