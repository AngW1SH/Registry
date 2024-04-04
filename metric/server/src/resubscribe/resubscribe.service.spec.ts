import { DeepMocked, createMock } from '@golevelup/ts-jest';
import { ResubscribeService } from './resubscribe.service';
import { Observable, Observer, Subscription } from 'rxjs';
import { Snapshot } from '../snapshot/snapshot.entity';

jest.useFakeTimers();
jest.spyOn(global, 'setInterval');
jest.spyOn(global, 'clearInterval');

describe('ResubscribeService', () => {
  let service: ResubscribeService;
  let subscribe: DeepMocked<Observable<Snapshot>>;
  let observer: DeepMocked<Observer<Snapshot>>;

  beforeEach(() => {
    subscribe = createMock<Observable<Snapshot>>();
    observer = createMock<Observer<Snapshot>>();
    service = new ResubscribeService();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('start method', () => {
    it('should be defined', () => {
      expect(service.start).toBeDefined();
    });

    it('should start an interval', () => {
      service.start(subscribe, observer);

      expect(setInterval).toHaveBeenCalled();
    });

    it('should attempt to resubscribe on connection close', async () => {
      subscribe.subscribe.mockReturnValueOnce(
        createMock<Subscription>({
          unsubscribe: jest.fn(),
          closed: true,
        }),
      );

      await service.start(subscribe, observer);

      jest.runOnlyPendingTimers();

      expect(subscribe.subscribe).toHaveBeenCalledTimes(2);

      jest.runOnlyPendingTimers();

      expect(subscribe.subscribe).toHaveBeenCalledTimes(3);
    });

    it('should not attempt to resubscribe if connection is still open', async () => {
      subscribe.subscribe.mockReturnValueOnce(
        createMock<Subscription>({
          unsubscribe: jest.fn(),
          closed: false,
        }),
      );

      await service.start(subscribe, observer);

      jest.runOnlyPendingTimers();

      expect(subscribe.subscribe).toHaveBeenCalledTimes(1);

      jest.runOnlyPendingTimers();

      expect(subscribe.subscribe).toHaveBeenCalledTimes(1);
    });
  });

  describe('stop method', () => {
    it('should be defined', () => {
      expect(service.stop).toBeDefined();
    });

    it('should stop the interval', async () => {
      await service.start(subscribe, observer);
      await service.stop();

      expect(clearInterval).toHaveBeenCalledTimes(1);
    });

    it('should close the subscription', async () => {
      const unsubscribeMock = jest.fn();

      subscribe.subscribe.mockReturnValueOnce(
        createMock<Subscription>({
          unsubscribe: unsubscribeMock,
          closed: false,
        }),
      );

      await service.start(subscribe, observer);

      await service.stop();

      expect(unsubscribeMock).toHaveBeenCalledTimes(1);
    });
  });
});
