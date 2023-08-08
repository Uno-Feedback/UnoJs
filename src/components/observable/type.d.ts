export interface ObserverInterface {
  fn: FunctionType;
  key: KeyType;
}

export type FunctionType = (data: any) => void;
export type KeyType = string;
export type DataType = any;
