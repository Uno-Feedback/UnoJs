import {DataType, FunctionType, KeyType, ObserverInterface} from "./type";

class Observable {
  private observers: ObserverInterface[];

  constructor() {
    this.observers = [];
  }

  subscribe(fn: FunctionType, key: KeyType) {
    this.observers.push({
      fn,
      key
    });
  }

  unsubscribe(key: KeyType) {
    this.observers = this.observers.filter(subscriber => subscriber.key !== key);
  }

  fire(data: DataType, key: KeyType) {
    this.observers.forEach(observer => observer.key === key && observer.fn(data));
  }
}

export default new Observable();
