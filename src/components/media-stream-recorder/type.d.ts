interface DisplayMediaConstraints {
  audio: boolean;
  video: boolean;
}

interface UserMediaConstraints {
  audio: {
    sampleSize: number;
    frameRate: {
      max: number;
    };
    channelCount: number;
  };
}

export interface OptionInterface {
  displayMediaConstraints: DisplayMediaConstraints;
  userMediaConstraints: UserMediaConstraints;
  mimeType: string;
}
