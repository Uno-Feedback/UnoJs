import { InitializeFunction, ValidationFunction } from "./types";
import { Time } from "./components/timer/type";
declare class UnoJSBuilder {
    private options;
    private subscriptionData;
    private startButton;
    private autoSecretKey;
    private screenMask;
    private timerWrapper;
    constructor();
    validateInitialization: ValidationFunction;
    startRecord: () => void;
    stopRecord: () => void;
    startMask: () => void;
    stopMask: () => void;
    startMute: () => void;
    stopMute: () => void;
    closeWidget: () => void;
    observeTime({ seconds }: Time): void;
    initialize: InitializeFunction;
}
declare const unoJS: UnoJSBuilder;
export default unoJS;
