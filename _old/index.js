// Load Styles
import {startSecret, endSecret} from './src/autoSecret';
import {createElement, destroyElement} from './src/floatingEmelemt.js';
import Observable from './src/Observable.js';
import initialState from './src/initialState.js';
import {runTimer, stopTimer} from './src/timer.js';
import ScreenMask from './src/screenMask.js';
import ScreenRecorder from './src/screenRecorder.js';

class unoJSBuilder {
  constructor() {
    this.options = null;
    this.subscriptionData = null;
    this.startButton = null;
    this.autoSecretDataAttribute = null;
    this.screenRecorder = new ScreenRecorder();
    this.screenMask = new ScreenMask();
    this.timerWrapper = null;
  }

  initialize(startButtonId, subscriptionData, options) {
    if (!subscriptionData) {
      console.error('[uno-js] Subscription data not set.');
      return;
    }
    if (!startButtonId) {
      console.error('[uno-js] Start button not set.');
      return;
    }
    if (!options?.user) {
      console.error('[uno-js] User data not set.');
      return;
    }
    if (!options?.autoSecretDataAttribute) {
      console.warn('[uno-js] Auto secret data attribute not set.');
    }

    console.info('[uno-js] Package initialized!');

    this.options = options;
    this.subscriptionData = subscriptionData;
    this.autoSecretDataAttribute = options?.autoSecretDataAttribute;
    this.startButton = document.getElementById(startButtonId);

    initialState.info = {
      fullName: this.options.user?.fullName,
      email: this.options.user?.email,
      avatar: this.options.user?.avatar,
      requestUrl: this.subscriptionData.requestUrl,
      apiKey: this.subscriptionData.apiKey,
      autoSecretDataAttribute: this.autoSecretDataAttribute,
    };

    if (this.startButton) {
      this.startButton.addEventListener('click', this.createElement.bind(this));
    } else {
      console.error(`Element with ID '${startButtonId}' not found.`);
    }
  }

  startRecording() {
    Observable.subscribe(this.clearElements.bind(this));
    startSecret();
    this.screenRecorder.start().then(record => {
        if (record === 'stopped') return;
        console.info('[uno-js] Record started');
        runTimer(this.timerWrapper, this.observeTime.bind(this));
      },
    ).catch(error => {
      this.clearElements();
      console.error(`[uno-js] Error while starting record: ${error}`);
    });
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
    endSecret();
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
//   user: {
//     fullName: 'John Doe',
//     email: 'n.kaviyani@asax.ir',
//     avatar: null,
//   },
//   autoSecretDataAttribute: 'secret-data',
//   callbacks: {
//     onOpenWidget: () => console.log('Widget opened'),
//     onCloseWidget: () => console.log('Widget closed'),
//     onStartMask: () => console.log('Started mask'),
//     onStopMask: () => console.log('Stopped mask'),
//     onStartTimer: ({second, minute, hours}) => console.log('Started recording timer: ' + second + ':' + minute + ':' + hours),
//     onStopTimer: () => console.log('Stopped recording timer'),
//     onStartRecording: () => console.log('Started recording!'),
//     onStopRecording: () => console.log('Stopped recording!'),
//     onSubmit: () => console.log('Submitted!'),
//     onError: () => console.log('Error!'),
//   },
// };
// const subscriptionData = {
//   apiKey: '',
//   requestUrl: '',
//   typeDynamic: true,
// }
//
// const startButtonId = 'startButton';
//
// unoJS.initialize(startButtonId, subscriptionData, options);