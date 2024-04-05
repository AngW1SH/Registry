import { DeepMocked, createMock } from '@golevelup/ts-jest';
import { PrismaService } from '../prisma/prisma.service';
import { MetricService } from './metric.service';
import { metricMocks, prismaMetricMocks } from './metric.mock';
import { TaskService } from '../task/task.service';
import { MetricNames } from './config/metricNames';

describe('MetricService', () => {
  let service: MetricService;
  let prisma: DeepMocked<PrismaService>;
  let taskService: DeepMocked<TaskService>;

  beforeEach(() => {
    prisma = createMock<PrismaService>({
      metric: {
        findMany: jest.fn().mockResolvedValue(prismaMetricMocks),
        update: jest.fn().mockResolvedValue(prismaMetricMocks[0]),
      },
    });
    taskService = createMock<TaskService>();

    service = new MetricService(prisma, taskService);
  });

  describe('findMany method', () => {
    it('should be defined', () => {
      expect(service).toBeDefined();
    });

    it('should return an array of metrics', async () => {
      const findManyMock = jest.spyOn(prisma.metric, 'findMany');
      findManyMock.mockReturnValueOnce(prismaMetricMocks as any);

      const result = await service.findMany({ resource: '1' });

      expect(result).toEqual(metricMocks);
    });
  });

  describe('listAll method', () => {
    it('should be defined', () => {
      expect(service).toBeDefined();
    });

    it('should return an array of metric names', async () => {
      const result = await service.listAll();

      expect(result[0]).toBeDefined();
      expect(result[0].name).toBeDefined();
      expect(typeof result[0].name).toEqual('string');
    });

    it('should return all defined metric names', async () => {
      const result = await service.listAll();

      const names = Object.keys(MetricNames);

      names.forEach((name) => {
        const found = result.find((r) => r.name === name);

        expect(found).toBeDefined();
      });
    });
  });

  describe('updateParams method', () => {
    it('should be defined', () => {
      expect(service).toBeDefined();
    });

    it('should call its own update method', async () => {
      const prismaReturn = { ...prismaMetricMocks[0], params: '["test"]' };
      jest.spyOn(prisma.metric, 'update').mockResolvedValueOnce(prismaReturn);
      const updateMock = jest
        .spyOn(service, 'update')
        .mockResolvedValueOnce('ok' as any);

      const result = await service.updateParams(metricMocks[0]);

      expect(updateMock).toHaveBeenCalled();
    });

    it('should return an updated metric', async () => {
      const prismaReturn = { ...prismaMetricMocks[0], params: '["test"]' };
      jest.spyOn(prisma.metric, 'update').mockResolvedValueOnce(prismaReturn);
      jest.spyOn(service, 'update').mockResolvedValueOnce('ok' as any);

      const result = await service.updateParams(metricMocks[0]);

      expect(result).toEqual({ ...metricMocks[0], params: '["test"]' });
    });

    it('should throw an error if failed to update metric in core', async () => {
      jest.spyOn(service, 'update').mockImplementationOnce(async () => {
        throw new Error();
      });

      await expect(service.updateParams(metricMocks[0])).rejects.toThrow();
    });

    it('should throw an error if provided JSON is invalid', async () => {
      await expect(
        service.updateParams({ ...metricMocks[0], params: '[[[' }),
      ).rejects.toThrow();
    });

    it("shouldn't call its own update method if provided JSON is invalid", async () => {
      const updateSpy = jest.spyOn(service, 'update');

      await expect(
        service.updateParams({ ...metricMocks[0], params: '[[[' }),
      ).rejects.toThrow();

      expect(updateSpy).not.toHaveBeenCalled();
    });
  });
});
