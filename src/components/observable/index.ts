import {DataType, FunctionType, KeyType, ObserverInterface} from './type';

class Observable {
  private observers: ObserverInterface[];

  constructor() {
    this.observers = [];
  }

  subscribe(key: KeyType, fn: FunctionType) {
    this.observers.push({
      fn,
      key,
    });
  }

  unsubscribe(key: KeyType) {
    this.observers = this.observers.filter(subscriber => subscriber.key !== key);
  }

  fire(key: KeyType, data?: DataType) {
    this.observers.forEach(observer => observer.key === key && observer.fn(data));
  }
}

export default new Observable();
