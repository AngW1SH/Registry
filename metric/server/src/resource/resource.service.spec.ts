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

jest.mock('./config', () => {
  return {
    ...jest.requireActual('./config'),
    get configs() {
      return platformMocks.reduce(
        (acc, cur) => ({ ...acc, [cur.name]: [] }),
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
      },
      platform: {
        findFirst: jest.fn().mockImplementation((args) => {
          return platformMocks.find(
            (platform) => platform.id === args?.where?.id,
          );
        }),
        findMany: jest.fn().mockResolvedValue(platformMocks),
      },
    });
    metricService = createMock<MetricService>();

    service = new ResourceService(prisma, metricService);
  });

  describe('findMany method', () => {
    it('should be defined', () => {
      expect(service.findMany).toBeDefined();
    });

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
    it('should be defined', () => {
      expect(service.findOne).toBeDefined();
    });

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
    it('should be defined', () => {
      expect(service.createOne).toBeDefined();
    });

    it('should call prisma.platform.findFirst with platform id selector', async () => {
      await service.createOne(resourceMocks[0]);

      expect(prisma.platform.findFirst).toHaveBeenCalledWith(
        expect.objectContaining({
          where: expect.objectContaining({ id: resourceMocks[0].platform }),
        }),
      );
    });

    it("should throw an error if platform doesn't exist", async () => {
      jest
        .spyOn(prisma.platform, 'findFirst')
        .mockResolvedValueOnce(null as any);

      await expect(service.createOne(resourceMocks[0])).rejects.toThrow();
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
});
