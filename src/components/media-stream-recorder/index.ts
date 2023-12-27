import {AUDIO_SAMPLE_SIZE, MAX_FRAME_RATE, AUDIO_CHANNEL_COUNT} from "../../shared/constants";
import Observable from "../observable";
// import openRequestFormModal from "../request-form";
import {OptionInterface} from "./type";
import videoPreview from "../video-preview";

class MediaStreamRecorder {
  private displayMediaConstraints: DisplayMediaStreamOptions;
  private readonly userMediaConstraints: MediaStreamConstraints;
  private readonly mimeType: string;

  constructor(options: OptionInterface) {
    // Declare constraints
    this.displayMediaConstraints = options?.displayMediaConstraints ?? {audio: true, video: true};
    this.userMediaConstraints = options?.userMediaConstraints ?? {
      audio: {
        sampleSize: AUDIO_SAMPLE_SIZE,
        frameRate: {max: MAX_FRAME_RATE},
        channelCount: AUDIO_CHANNEL_COUNT
      }
    };
    // Declare a mime type
    this.mimeType = options?.mimeType ?? "video/webm";
  }

  // Declare Stats
  videoStreamState: MediaStream | undefined;
  audioStreamState: MediaStream | undefined;
  // Start recording function
  startRecording = async (stream: MediaStream) => {
    // Create a media recorder
    const recorder = new MediaRecorder(stream);
    // The stream data is stored in this array
    console.info("[uno-js] Stream data is stored in this array.");
    let data: any[] = [];
    // Push frames to array
    console.info("[uno-js] Pushing frames to array.");
    recorder.ondataavailable = event => data?.push(event.data);
    // Start media recorder
    console.info("[uno-js] Starting media recorder...");
    recorder.start();
    // Check if the stream is stopped
    console.info("[uno-js] Checking if stream is stopped...");
    let stopped = new Promise((resolve, reject) => {
      recorder.onstop = resolve;
      recorder.onerror = () => reject(`[uno-js] MediaRecorder error: ${(recorder.onerror as any)?.name}`);
      console.info("[uno-js] Stream is stopped.");
    });
    // When stream is stopped, return data
    await Promise.all([stopped]);
    return data;
  };
  renderStream = (stream: MediaStream) => {
    // Check if stream is stopped with the browser button
    stream.getVideoTracks()[0].onended = () => this.stopRecording();
    this.startRecording(stream).then(recordedChunks => {
      const mimeType = this.mimeType;
      // Create Blob and video file
      const recordedBlob = new Blob(recordedChunks, {type: mimeType});
      // Fire observer
      Observable.fire("setRecordState", false);
      Observable.fire("closeWidget");
      // Preview of video file
      videoPreview(recordedBlob);
      // openRequestFormModal(recordedBlob);
      console.info(`[uno-js] Successfully recorded ${recordedBlob.size} bytes of ${recordedBlob.type} media.`);
    });
  };
  // Stop recording function
  stopRecording = () => {
    // Stop every track of each stream
    console.info("[uno-js] Stopped recording.");
    if (this.videoStreamState) this.videoStreamState.getTracks().forEach(track => track.stop());
    if (this.audioStreamState) this.audioStreamState.getTracks().forEach(track => track.stop());
  };
  // Create a mixed stream from display media and user media
  createStream = async () => {
    // Get display media
    console.info("[uno-js] Getting display media...");
    this.videoStreamState = await navigator.mediaDevices
      .getDisplayMedia(this.displayMediaConstraints)
      .then(video => video)
      .catch(() => undefined);
    if (!this.videoStreamState) {
      console.error("[uno-js] Permission or display media not found!");
      return false;
    }
    // Get user media (Just Audio)
    console.info("[uno-js] Getting audio...");
    try {
      this.audioStreamState = await navigator.mediaDevices.getUserMedia(this.userMediaConstraints);
      // Get the Audio track of this moment
      const audioTrack = this.audioStreamState.getAudioTracks()[0];
      // Add microphone audio to display video
      this.videoStreamState.addTrack(audioTrack);
    } catch {
      // do nothing
      console.error("[uno-js] Microphone or system audio not found!");
    }
    // Return mixed stream
    return this.videoStreamState;
  };
  // Start to get permission
  start = async () => {
    // Create recorded chunks and wait for stop
    console.info("[uno-js] Starting recording...");
    return await this.createStream()
      .then(stream => {
        if (!stream) {
          console.info("[uno-js] Stream is not created.");
          return false;
        }
        console.info("[uno-js] Stream is created.");
        this.renderStream(stream);
        return true;
      })
      .catch(error => {
        if (error.name === "NotFoundError") {
          console.error("[uno-js] Camera or microphone not found. Can't record.");
        } else {
          console.error(error);
        }
      });
  };
}

export default MediaStreamRecorder;
