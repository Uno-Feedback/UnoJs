# UnoJs

UnoJs is a video recording and screen capture tool that allows you to easily record your videos and send them to Jira, Zoho, or other project management systems.

## Features

- One-click video recording.
- Send video to Jira, Zoho, or other project management systems.
- Mask sensitive data
- Edit video in your browser (coming soon)

## Getting Started

### Installation

To start using UnoJs in your project, follow these steps:

1. Download the `esm` or `cjs` version from the `dist` directory of this repository.

2. Include the UnoJs script in your HTML file:

```html
<script type='module' src='path/to/uno/index.js'></script>
```

3. Now you can use UnoJs functions in your JavaScript code. For example:

```JS
// Select a button by ID
const startButtonId = "start-btn";

// Create options object
const options = {
  // Reporter options
  user: {
    fullName: "John Doe",
    email: "j.doe@example.com",
    avatar: null,
  },
  // Auto secret key data attribute
  autoSecretKey: "secret",
  // Callbacks
  callbacks: {
    onOpenWidget: () => console.log("Widget opened"),
    onCloseWidget: () => console.log("Widget closed"),
    onStartMask: () => console.log("Started mask"),
    onStopMask: () => console.log("Stopped mask"),
    onStartTimer: ({ second, minute, hours }) => console.log("Started recording timer: " + second + ":" + minute + ":" + hours),
    onStopTimer: () => console.log("Stopped recording timer"),
    onStartRecording: () => console.log("Started recording!"),
    onStopRecording: () => console.log("Stopped recording!"),
    onSubmit: () => console.log("Submitted!"),
    onError: () => console.log("Error!"),
  },
};
// Subscription data
const subscriptionData = {
  apiKey: "#API_KEY#",
  requestUrl: "#REQUEST_URL#",
};
// Initialize UnoJs
unoJS.initialize(startButtonId, subscriptionData, options);
```


### Requirements

- A Jira or Zoho account
- A computer with Windows, macOS, or Linux operating system
- A web browser

## Examples
Check out the examples directory in this repository for practical usage examples of UnoJs.

## Contributing
Contributions are welcome! If you find a bug or have an idea for a new feature, please create an issue in the GitHub repository.

If you'd like to contribute code, please follow these steps:

1. Fork the repository and create a new branch.
2. Make your changes and ensure that the code passes any existing tests.
3. Create a pull request, describing your changes and the problem or feature they address.

## About Us

UnoJs is created by a team of skilled developers who are committed to providing the best feedback experience for users. We are always working on new features and improvements for UnoJs, and we look forward to hearing your feedback.

## License

This project is licensed under the [Fair-code](https://faircode.io/) License.