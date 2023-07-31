// Declare variable
import {RunTimerFunction, Timer} from "./type";

let timer: Timer;
let timerRef: HTMLElement | null;
export const runTimer: RunTimerFunction = (ref, callback) => {
  // Initial ref
  timerRef = ref;
  let [milliseconds, seconds, minutes, hours] = [0, 0, 0, 0];
  // Calculate time
  const displayTimer = () => {
    milliseconds += 10;
    if (milliseconds === 1000) {
      milliseconds = 0;
      seconds++;
      // Update time in callback
      updateCallback();
      if (seconds === 60) {
        seconds = 0;
        minutes++;
        if (minutes === 60) {
          minutes = 0;
          hours++;
        }
      }
    }
    // Update time in ref
    updateTimer();
  };
  // Update time in ref
  const updateTimer = () => {
    let h = hours < 10 ? "0" + hours : hours;
    let m = minutes < 10 ? "0" + minutes : minutes;
    let s = seconds < 10 ? "0" + seconds : seconds;
    // let ms = milliseconds < 10 ? '00' + milliseconds : milliseconds < 100 ? '0' + milliseconds : milliseconds;
    if (timerRef) timerRef.innerText = `${hours < 1 ? "" : h + ":"}${m}:${s}`;
  };
  // Update time in callback
  const updateCallback = () => callback({seconds, minutes, hours});
  // Clear unnecessary interval
  if (timer) clearInterval(timer);
  // Set interval for every 10 milliseconds
  timer = setInterval(displayTimer, 10);
};
export const stopTimer = () => {
  if (timerRef) timerRef.innerText = "00:00";
  clearInterval(timer);
};
