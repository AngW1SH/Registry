import { DeepMocked, createMock } from '@golevelup/ts-jest';
import { MetricGateway } from './gateway';
import { PrismaService } from '../prisma/prisma.service';
import { Server } from 'socket.io';
import { Snapshot } from '../snapshot/snapshot.entity';
import { dataMocks, resourceMocks, snapshotMocks } from './gateway.mock';
import { Data } from './metric-gateway.entity';

describe('MetricGateway', () => {
  let gateway: MetricGateway;
  let prisma: DeepMocked<PrismaService>;

  beforeEach(() => {
    prisma = createMock<PrismaService>({
      resource: {
        findMany: jest.fn().mockResolvedValue([]),
      },
    });
    gateway = new MetricGateway(prisma);

    const server = createMock<Server>();
    gateway.server = server;
  });

  describe('onModuleInit method', () => {
    it('should call server.on', () => {
      gateway.onModuleInit();

      expect(gateway.server.on).toHaveBeenCalledWith(
        'connection',
        expect.any(Function),
      );
    });
  });

  describe('send method', () => {
    it('should call server.emit', async () => {
      const data: Snapshot[] = [];

      await gateway.send(data);

      expect(gateway.server.emit).toHaveBeenCalled();
    });

    it('should call server.emit with the "message" event name', async () => {
      const data: Snapshot[] = [];

      await gateway.send(data);

      expect(gateway.server.emit).toHaveBeenCalledWith('message', []);
    });

    it('should call server.emit with the correct data', async () => {
      const data: Snapshot[] = snapshotMocks;
      const result: Data[] = dataMocks;

      jest
        .spyOn(prisma.resource, 'findMany')
        .mockResolvedValueOnce(resourceMocks as any);

      await gateway.send(data);

      expect(jest.spyOn(gateway.server, 'emit').mock.calls[0][1]).toEqual(
        result,
      );
    });
  });
});
