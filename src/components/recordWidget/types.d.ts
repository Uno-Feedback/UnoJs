interface WidgetFunctionProps {
  onStartRecord: (start: boolean) => void;
  onStopRecord: (stop: boolean) => void;
  onStartMask: (start: boolean) => void;
  onStopMask: (stop: boolean) => void;
  onStartMute: (start: boolean) => void;
  onStopMute: (stop: boolean) => void;
  onCloseWidget: (start: boolean) => void;
}

export interface Tab {
  title: string;
  icon: string;
}

export type OpenRecordWidgetFunction = (props: WidgetFunctionProps) => Promise<HTMLElement>;
