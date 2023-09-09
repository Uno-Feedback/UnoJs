/**
 * A simple implementation of the Observable pattern.
 */

// Import necessary types from the "type" module.
import {FunctionType, ObserverInterface} from "./type";

class Observable {
  private observers: ObserverInterface[];

  constructor() {
    // Initialize an empty array to store observers.
    this.observers = [];
  }

  /**
   * Subscribe a new observer to the observable.
   *
   * @param key - The key associated with the observer.
   * @param fn - The function to be called when the observable is fired.
   */
  subscribe(key: string, fn: FunctionType) {
    // Add the observer to the list of observers.
    this.observers.push({
      fn,
      key
    });
  }

  /**
   * Unsubscribe an observer based on its key.
   *
   * @param key - The key of the observer to be unsubscribed.
   */
  unsubscribe(key: string) {
    // Filter out the observer with the provided key.
    this.observers = this.observers.filter(subscriber => subscriber.key !== key);
  }

  /**
   * Fire the observable by calling the associated observer functions.
   *
   * @param key - The key of the observers to be fired.
   * @param data - Optional data to be passed to the observer functions.
   */
  fire(key: string, data?: any) {
    // Call the observer functions associated with the provided key.
    this.observers.forEach(observer => observer.key === key && observer.fn(data));
  }
}

// Export an instance of the Observable class as the default export.
export default new Observable();
