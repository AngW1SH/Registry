import { DeepMocked, createMock } from '@golevelup/ts-jest';
import { ResourceService } from './resource.service';
import { PrismaService } from '../prisma/prisma.service';
import { MetricService } from '../metric/metric.service';
import {
  resourceMocks,
  resourcePrismaMocks,
  resourceWithMetricsMocks,
} from './resource.mock';
import { platformMocks } from '../platform/platform.mock';
import * as configModule from './config';
import { metricMocks, prismaMetricMocks } from '../metric/metric.mock';

jest.mock('./config', () => {
  return {
    ...jest.requireActual('./config'),
    get configs() {
      return platformMocks.reduce(
        (acc, cur) => ({ ...acc, [cur.name]: { data: [] } }),
        {},
      );
    },
  };
});

describe('ResourceService', () => {
  let service: ResourceService;
  let prisma: DeepMocked<PrismaService>;
  let metricService: DeepMocked<MetricService>;

  beforeEach(() => {
    jest.clearAllMocks();

    prisma = createMock<PrismaService>({
      resource: {
        findFirst: jest.fn().mockResolvedValue(null),
        findMany: jest.fn().mockResolvedValue([]),
        create: jest.fn().mockResolvedValue(resourceMocks[0]),
        update: jest.fn().mockResolvedValue(resourceMocks[0]),
        delete: jest.fn().mockResolvedValue(resourceMocks[0]),
      },
      metric: {
        findMany: jest.fn().mockResolvedValue([]),
      },
    });
    metricService = createMock<MetricService>();

    service = new ResourceService(prisma, metricService);
  });

  describe('findMany method', () => {
    it('should call prisma findMany with project id selector', async () => {
      jest.spyOn(prisma.resource, 'findMany').mockResolvedValueOnce([]);

      await service.findMany({ project: '1' });

      expect(prisma.resource.findMany).toHaveBeenCalledWith(
        expect.objectContaining({
          where: expect.objectContaining({ projectId: '1' }),
        }),
      );
    });

    it('should return an array of resources', async () => {
      jest
        .spyOn(prisma.resource, 'findMany')
        .mockResolvedValueOnce(resourcePrismaMocks);

      expect(await service.findMany({ project: '1' })).toEqual(
        resourceWithMetricsMocks,
      );
    });
  });

  describe('findOne method', () => {
    it('should call prisma findFirst with resource id selector', async () => {
      jest.spyOn(prisma.resource, 'findFirst').mockResolvedValueOnce(null);

      await service.findOne('1');

      expect(prisma.resource.findFirst).toHaveBeenCalledWith(
        expect.objectContaining({
          where: expect.objectContaining({ id: '1' }),
        }),
      );
    });

    it("should call metricService's findMany method", async () => {
      jest
        .spyOn(prisma.resource, 'findFirst')
        .mockResolvedValueOnce(resourcePrismaMocks[0]);

      jest
        .spyOn(metricService, 'findMany')
        .mockResolvedValueOnce(resourceWithMetricsMocks[0].metrics);

      await service.findOne('1');

      expect(metricService.findMany).toHaveBeenCalledWith({
        resource: '1',
      });
    });

    it('should return a ResourceWithMetrics', async () => {
      jest
        .spyOn(prisma.resource, 'findFirst')
        .mockResolvedValueOnce(resourcePrismaMocks[0]);

      jest
        .spyOn(metricService, 'findMany')
        .mockResolvedValueOnce(resourceWithMetricsMocks[0].metrics);

      const result = await service.findOne('1');

      expect(result).toEqual(resourceWithMetricsMocks[0]);
    });

    it("should return null if the resource doesn't exist", async () => {
      jest.spyOn(prisma.resource, 'findFirst').mockResolvedValueOnce(null);

      const result = await service.findOne('1');

      expect(result).toBeNull();
    });

    it("should not call metricService's findMany if resource doesn't exist", async () => {
      jest.spyOn(prisma.resource, 'findFirst').mockResolvedValueOnce(null);

      await service.findOne('1');

      expect(metricService.findMany).not.toHaveBeenCalled();
    });
  });

  describe('createOne method', () => {
    it("should throw an error if platform doesn't exist", async () => {
      await expect(
        service.createOne({ ...resourceMocks[0], platform: '1' }),
      ).rejects.toThrow();
    });

    it('should search for resource params config', async () => {
      const spy = jest.spyOn(configModule, 'configs', 'get');

      await service.createOne(resourceMocks[0]);

      expect(spy).toHaveBeenCalled();
    });

    it('should throw an error if resource params config is not found', async () => {
      jest
        .spyOn(configModule, 'configs', 'get')
        .mockResolvedValueOnce({} as never);

      await expect(service.createOne(resourceMocks[0])).rejects.toThrow();
    });

    it('should call prisma.resource.create', async () => {
      await service.createOne(resourceMocks[0]);

      expect(prisma.resource.create).toHaveBeenCalled();
    });

    it('should throw an error if resource was not created', async () => {
      jest.spyOn(prisma.resource, 'create').mockResolvedValueOnce(null as any);

      await expect(service.createOne(resourceMocks[0])).rejects.toThrow();
    });
  });

  describe('updateOne method', () => {
    it('should call prisma.resource.update', async () => {
      await service.updateOne(resourceMocks[0]);

      expect(prisma.resource.update).toHaveBeenCalled();
    });

    it('should throw an error if resource was not updated', async () => {
      jest.spyOn(prisma.resource, 'update').mockResolvedValueOnce(null as any);

      await expect(service.updateOne(resourceMocks[0])).rejects.toThrow();
    });

    it('should return the updated resource', async () => {
      jest
        .spyOn(prisma.resource, 'update')
        .mockResolvedValueOnce(resourcePrismaMocks[0]);

      const result = await service.updateOne(resourceMocks[0]);

      expect(result).toEqual(resourceMocks[0]);
    });
  });

  describe('deleteOne method', () => {
    it('should call prisma.resource.delete', async () => {
      await service.deleteOne('1');

      expect(prisma.resource.delete).toHaveBeenCalled();
    });

    it('should throw an error if resource was not deleted', async () => {
      jest.spyOn(prisma.resource, 'delete').mockResolvedValueOnce(null as any);

      await expect(service.deleteOne('1')).rejects.toThrow();
    });

    it('should return the deleted resource', async () => {
      jest
        .spyOn(prisma.resource, 'delete')
        .mockResolvedValueOnce(resourcePrismaMocks[0]);

      const result = await service.deleteOne('1');

      expect(result).toEqual(resourceMocks[0]);
    });
  });

  describe('getMetrics method', () => {
    it('should call prisma.metric.findMany', async () => {
      await service.getMetrics('1');

      expect(prisma.metric.findMany).toHaveBeenCalled();
    });

    it('should return resource metrics', async () => {
      jest
        .spyOn(prisma.metric, 'findMany')
        .mockResolvedValueOnce(prismaMetricMocks);

      const result = await service.getMetrics('1');

      expect(result).toEqual(metricMocks);
    });
  });

  describe('startTracking method', () => {
    it('should call its own getMetrics method', () => {
      jest.spyOn(service, 'getMetrics').mockResolvedValue([]);

      service.startTracking('1');

      expect(service.getMetrics).toHaveBeenCalled();
    });

    it("should throw an error if couldn't get metrics", () => {
      jest.spyOn(service, 'getMetrics').mockImplementationOnce(() => {
        throw new Error();
      });

      expect(service.startTracking('1')).rejects.toThrow();
    });

    it("should call metricService's start method", async () => {
      jest.spyOn(service, 'getMetrics').mockResolvedValue(metricMocks);

      await service.startTracking('1');

      expect(metricService.start).toHaveBeenCalledTimes(metricMocks.length);
    });
  });

  describe('stopTracking method', () => {
    it('should call its own getMetrics method', () => {
      jest.spyOn(service, 'getMetrics').mockResolvedValue([]);

      service.stopTracking('1');

      expect(service.getMetrics).toHaveBeenCalled();
    });

    it("should throw an error if couldn't get metrics", () => {
      jest.spyOn(service, 'getMetrics').mockImplementationOnce(() => {
        throw new Error();
      });

      expect(service.stopTracking('1')).rejects.toThrow();
    });

    it("should call metricService's stop method", async () => {
      jest.spyOn(service, 'getMetrics').mockResolvedValue(metricMocks);

      await service.stopTracking('1');

      expect(metricService.stop).toHaveBeenCalledTimes(metricMocks.length);
    });
  });

  describe('populateWithSnapshots method', () => {
    it("should call metricService's populateWithSnapshots method", async () => {
      const resource = { ...resourceWithMetricsMocks[0], metrics: metricMocks };

      const snapshots = metricMocks.reduce(
        (acc, cur) => ({ ...acc, [cur.name]: cur }),
        {},
      );
      await service.populateWithSnapshots(resource, snapshots);

      expect(metricService.populateWithSnapshots).toHaveBeenCalledTimes(
        metricMocks.length,
      );
    });
  });
});
