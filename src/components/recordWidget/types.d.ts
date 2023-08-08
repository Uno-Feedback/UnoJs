interface WidgetFunctionProps {
  startRecord: (start: boolean) => void;
  stopRecord: (stop: boolean) => void;
  startMask: (start: boolean) => void;
  stopMask: (stop: boolean) => void;
  startMute: (start: boolean) => void;
  stopMute: (start: boolean) => void;
  closeWidget: (close: boolean) => void;
}
export type OpenRecordWidgetFunction = (props: WidgetFunctionProps) => Promise<HTMLElement>;
