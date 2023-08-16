import {FunctionType, ObserverInterface} from "./type";

class Observable {
  private observers: ObserverInterface[];

  constructor() {
    this.observers = [];
  }

  subscribe(key: string, fn: FunctionType) {
    this.observers.push({
      fn,
      key
    });
  }

  unsubscribe(key: string) {
    this.observers = this.observers.filter(subscriber => subscriber.key !== key);
  }

  fire(key: string, data?: any) {
    this.observers.forEach(observer => observer.key === key && observer.fn(data));
  }
}

export default new Observable();
