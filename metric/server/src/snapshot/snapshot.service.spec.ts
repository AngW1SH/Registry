import { ClientGrpc } from '@nestjs/microservices';
import { SnapshotService, SnapshotServiceGRPC } from './snapshot.service';
import { DeepMocked, createMock } from '@golevelup/ts-jest';
import { MetricGateway } from '../metric-gateway/gateway';
import { ResubscribeService } from '../resubscribe/resubscribe.service';
import { firstValueFrom } from 'rxjs';
import { snapshotGRPCMocks, snapshotMocks } from './snapshot.mock';
import { fromGRPC } from './utils/fromGRPC';

jest.mock('rxjs', () => ({
  firstValueFrom: jest.fn().mockResolvedValue({ Snapshots: [] }),
}));

describe('SnapshotService', () => {
  let service: SnapshotService;
  let client: DeepMocked<ClientGrpc>;
  let gateway: DeepMocked<MetricGateway>;
  let resubscribe: DeepMocked<ResubscribeService>;

  let serviceGRPC = createMock<SnapshotServiceGRPC>();

  beforeEach(() => {
    jest.clearAllMocks();

    client = createMock<ClientGrpc>({
      getService: jest.fn().mockReturnValue(serviceGRPC),
    });
    gateway = createMock<MetricGateway>();
    resubscribe = createMock<ResubscribeService>();

    service = new SnapshotService(client, gateway, resubscribe);
  });

  describe('onModuleInit', () => {
    it('should be defined', () => {
      expect(service).toBeDefined();
    });

    it('should get a snapshot service', async () => {
      service.onModuleInit();

      expect(client.getService).toHaveBeenCalledWith('SnapshotService');
    });

    it("should start a resubscribe service with the client's stream method", async () => {
      const streamMock = jest.fn();
      jest.spyOn(serviceGRPC, 'stream').mockReturnValue(streamMock as never);

      service.onModuleInit();
      expect(resubscribe.start).toHaveBeenCalledWith(
        streamMock,
        expect.anything(),
      );
    });
  });

  describe('list method', () => {
    beforeEach(() => {
      service.onModuleInit();
    });

    it('should be defined', () => {
      expect(service.list).toBeDefined();
    });

    it("should call the client's list method", async () => {
      const group = 'test';

      await service.list(group);

      expect(serviceGRPC.list).toHaveBeenCalledWith({ Group: group });
    });

    it('should return a list of snapshots', async () => {
      (firstValueFrom as jest.Mock).mockResolvedValueOnce({
        Snapshots: snapshotGRPCMocks,
      });

      const result = await service.list('test');

      expect(result).toEqual(snapshotMocks);
    });

    it('should return an empty array if there are no snapshots', async () => {
      (firstValueFrom as jest.Mock).mockResolvedValueOnce({ Snapshots: [] });
      (firstValueFrom as jest.Mock).mockResolvedValueOnce(null);

      const result1 = await service.list('test');
      const result2 = await service.list('test');

      expect(result1).toEqual([]);
      expect(result2).toEqual([]);
    });
  });
});
