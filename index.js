// Load Styles
// import '../scss/main.scss';
import {createElement, destroyElement} from './src/floatingEmelemt.js';
import Observable from './src/Observable.js';
import {initialInfo} from './src/saveData.js';
import {runTimer, stopTimer} from './src/timer.js';
import ScreenMask from './src/screenMask.js';
import ScreenRecorder from './src/screenRecorder.js';

class unoJSBuilder {
  constructor() {
    this.options = null;
    this.startButton = null;
    this.screenRecorder = new ScreenRecorder();
    this.screenMask = new ScreenMask();
    this.timerWrapper = null;
  }

  /* todo change name and sort of arguments: data, id, options */
  initialize({options, startButtonId}) {
    if (!options) {
      console.error('[uno-js] Options not set.');
      return;
    }
    if (!startButtonId) {
      console.error('[uno-js] Start button not set.');
      return;
    }
    console.info('[uno-js] Package initialized!');

    this.options = options;
    this.startButton = document.getElementById(startButtonId);

    initialInfo.info = {
      fullName: this.options.fullName,
      email: this.options.email,
      avatar: this.options.avatar,
      requestUrl: this.options.requestUrl,
      apiKey: this.options.apiKey,
    };

    if (this.startButton) {
      this.startButton.addEventListener('click', this.createElement.bind(this));
    } else {
      console.error(`Element with ID '${startButtonId}' not found.`);
    }
  }

  startRecording() {
    Observable.subscribe(this.clearElements.bind(this));
    this.screenRecorder.start().then(record => {
      if (record === 'stopped') return;
      console.info('[uno-js] Record started');
      runTimer(this.timerWrapper, this.observeTime.bind(this));}
    );
  }

  stopRecording() {
    console.info('[uno-js] Record stopped!');
    this.screenRecorder.stopRecording();
  }

  clearElements(data) {
    if (data !== 'clearElements') return;
    console.info('[uno-js] Element cleared!');
    stopTimer();
    destroyElement();
    this.stopMask();
    Observable.unsubscribe(this.clearElements.bind(this));
    this.screenRecorder.stopRecording();
  }

  startMask() {
    this.screenMask.init(true);
  }

  stopMask() {
    this.screenMask.removeAllElements();
    this.screenMask.init(false);
  }

  observeTime({seconds}) {
    if (seconds === 30) {
      this.stopRecording();
    }
  }

  createElement() {
    createElement(this.clearElements.bind(this), this.startRecording.bind(this), this.stopRecording.bind(this), this.startMask.bind(this), this.stopMask.bind(this)).then(element => {
      this.timerWrapper = element;
    });
  }
}

const unoJS = new unoJSBuilder();
export default unoJS;

// // Usage example:
// const options = {
//   fullName: 'John Doe',
//   email: 'n.kaviyani@asax.ir',
//   avatar: null,
//   requestUrl: '',
//  typeDynamic:true,
// };
//
// const startButtonId = 'startButton';
//
// unoJS.initialize({options, startButtonId});