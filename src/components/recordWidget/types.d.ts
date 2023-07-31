export type OpenRecordWidgetFunction = (
  startRecord: (start: boolean) => void,
  stopRecord: (stop: boolean) => void,
  startMask: (start: boolean) => void,
  stopMask: (stop: boolean) => void,
  closeWidget: (close: boolean) => void
) => Promise<HTMLElement>;
