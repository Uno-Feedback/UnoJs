import {Options} from "../types";
import {MAX_VIDEO_LENGTH} from "./constants";

const optionsState: Options = {
  user: {
    fullName: "",
    email: "",
    avatar: ""
  },
  subscriptionData: {
    apiKey: "",
    requestUrl: ""
  },
  startButtonId: "",
  videoMaxLength: MAX_VIDEO_LENGTH,
  isExtension: false
};

export default optionsState;
