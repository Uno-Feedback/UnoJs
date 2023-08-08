export interface Options {
  user: User;
  autoSecretKey?: string;
  callbacks?: Callbacks;
}

export interface User {
  fullName: string;
  email: string;
  avatar?: string;
}

export interface Timer {
  second: number;
  minute: number;
  hour: number;
}

export interface Callbacks {
  onOpenWidget?: () => void;
  onCloseWidget?: () => void;
  onStartMask?: () => void;
  onStopMask?: () => void;
  onStartTimer?: (timer: Timer) => void;
  onStopTimer?: () => void;
  onStartRecording?: () => void;
  onStopRecording?: () => void;
  onSubmit?: () => void;
  onError?: () => void;
  onSuccess?: () => void;
}

export interface SubscriptionData {
  apiKey: string;
  requestUrl: string;
}

export interface InitializationData {
  subscriptionData: SubscriptionData;
  startButtonId: string;
  options: Options;
}

export type InitializeFunction = (
  startButtonId: string,
  subscriptionData: SubscriptionData,
  options: Options
) => void;

export type ValidationFunction = (
  startButtonId: string,
  subscriptionData: SubscriptionData,
  options: Options
) => boolean;
