export type FunctionType = (data: any) => void;

export interface ObserverInterface {
  fn: FunctionType;
  key: string;
}
