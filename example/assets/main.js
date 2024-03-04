import unoJS from "../../dist/esm/index.js";
// Usage example:
const options = {
  user: {
    fullName: "John Doe",
    email: "j.doe@example.com",
    avatar: null
  },
  autoSecretKey: "secret",
  callbacks: {
    onOpenWidget: () => console.log("Widget opened"),
    onCloseWidget: () => console.log("Widget closed"),
    onStartMask: () => console.log("Started mask"),
    onStopMask: () => console.log("Stopped mask"),
    onStartTimer: ({second, minute, hours}) =>
      console.log("Started recording timer: " + second + ":" + minute + ":" + hours),
    onStopTimer: () => console.log("Stopped recording timer"),
    onStartRecording: () => console.log("Started recording!"),
    onStopRecording: () => console.log("Stopped recording!"),
    onSubmit: () => console.log("Submitted!"),
    onError: () => console.log("Error!")
  },
  subscriptionData: {
    apiKey: "#API_KEY#",
    requestUrl: "#REQUEST_URL#"
  },
  startButtonId: "start-btn",
  isExtension: false
};

unoJS.initialize(options);
