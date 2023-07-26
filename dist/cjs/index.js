"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
            if (!(options === null || options === void 0 ? void 0 : options.autoSecretKey)) {
                console.warn("[uno-js] Auto secret data attribute not set.");
            }
            return true;
        };
        this.initialize = (startButtonId, subscriptionData, options) => {
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
        this.options = null;
        this.subscriptionData = null;
        this.startButton = null;
        this.autoSecretKey = null;
    }
}
const unoJS = new UnoJSBuilder();
exports.default = unoJS;
