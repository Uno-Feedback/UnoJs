export type Timer = NodeJS.Timeout | undefined;

export interface Time {
  seconds: number;
  minutes: number;
  hours: number;
}

export type CallbackFunction = (time: Time) => void;
export type RunTimerFunction = (ref: HTMLElement | null, callback: CallbackFunction) => void;
