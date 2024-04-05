import { DeepMocked, createMock } from '@golevelup/ts-jest';
import { PrismaService } from '../prisma/prisma.service';
import { MetricService } from './metric.service';
import { metricMocks, prismaMetricMocks } from './metric.mock';
import { TaskService } from '../task/task.service';

describe('MetricService', () => {
  let service: MetricService;
  let prisma: DeepMocked<PrismaService>;
  let taskService: DeepMocked<TaskService>;

  beforeEach(() => {
    prisma = createMock<PrismaService>({
      resourceMetric: {
        findMany: jest.fn().mockResolvedValue(prismaMetricMocks),
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
      const findManyMock = jest.spyOn(prisma.resourceMetric, 'findMany');
      findManyMock.mockReturnValueOnce(prismaMetricMocks as any);

      const result = await service.findMany({ resource: '1' });

      expect(result).toEqual(metricMocks);
    });
  });
});
