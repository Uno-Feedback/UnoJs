interface Options {
    user: User;
    callbacks?: Callbacks;
    autoSecretKey?: string;
    startButtonId: string;
    subscriptionData: SubscriptionData;
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

export interface InitializationData {
    options: Options;
}

export type InitializeFunction = (options: Options) => void;

export type ValidationFunction = (options: Options) => boolean;
