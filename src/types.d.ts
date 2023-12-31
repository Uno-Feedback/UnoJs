export interface Options {
  user: User;
  callbacks?: Callbacks;
  subscriptionData: SubscriptionData;
  autoSecretKey?: string;
  startButtonId: string;
  videoMaxLength?: number;
  isExtension?: boolean;
}

export interface User {
  fullName: string;
  email: string;
  avatar: string;
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

//TODO: we can remove this interface and move these two fields into Options
interface SubscriptionData {
  apiKey: string;
  requestUrl: string;
}
