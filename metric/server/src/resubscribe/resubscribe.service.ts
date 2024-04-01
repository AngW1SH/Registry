import { Injectable } from '@nestjs/common';
import { Observable, Observer, Subscription } from 'rxjs';

@Injectable()
export class ResubscribeService {
  private subscription: Subscription;
  private connectionWatchdog: NodeJS.Timeout;

  constructor() {}

  async start<T>(
    observable: Observable<T>,
    observer: Observer<T>,
    interval = 5000,
  ) {
    const noErrorObserver = {
      ...observer,
      error: () => {
        console.log('Observer error');
      },
    };

    if (!this.subscription) {
      this.subscription = observable.subscribe(noErrorObserver);
    }

    this.connectionWatchdog = setInterval(() => {
      if (!this.subscription || this.subscription.closed) {
        this.subscription = observable.subscribe(noErrorObserver);
      }
    }, interval);
  }

  async stop() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }

    if (this.connectionWatchdog) {
      clearInterval(this.connectionWatchdog);
    }
  }
}
