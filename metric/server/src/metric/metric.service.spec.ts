import { DeepMocked, createMock } from '@golevelup/ts-jest';
import { PrismaService } from '../prisma/prisma.service';
import { MetricService } from './metric.service';
import { metricMocks, prismaMetricMocks } from './metric.mock';
import { TaskService } from '../task/task.service';
import { MetricNames } from './config/metricNames';
import { MetricParam, MetricParamType, UnitOfTime } from './config/types';
import * as metricParamsModule from './config/metricParams';
import * as metricDependenciesModule from './config/metricDependencies';

const validParams: MetricParam[] = [
  {
    name: 'weight',
    type: MetricParamType.text,
    placeholder: 'weight',
    value: '1',
    label: 'weight',
    tooltip: 'weight',
  },
  {
    name: 'updateRate',
    type: MetricParamType.duration,
    placeholder: 'updateRate',
    value: {
      number: 2,
      unitOfTime: UnitOfTime.weeks,
    },
    label: 'updateRate',
    tooltip: 'updateRate',
  },
  {
    name: 'metricParam',
    type: MetricParamType.text,
    placeholder: 'metricParam',
    value: 'metricParam',
    label: 'metricParam',
    tooltip: 'metricParam',
  },
];

jest.mock('./config/metricDependencies', () => ({
  ...jest.requireActual('./config/metricDependencies'),
  get metricDependencies() {
    return {
      Test: ['TestDependency1', 'TestDependency2'],
      TestDependency1: [],
      TestDependency2: ['TestDependency1'],
    };
  },
}));

jest.mock('./config/metricParams', () => ({
  ...jest.requireActual('./config/metricParams'),
  get metricParams() {
    return {
      Test: [],
      TestDependency1: [],
      TestDependency2: [],
    };
  },
}));

const prismaMetricWithResourceAndProject = {
  ...prismaMetricMocks[0],
  resource: {
    id: '1',
    name: 'resource',
    project: { id: '1', name: 'project' },
  },
};

describe('MetricService', () => {
  let service: MetricService;
  let prisma: DeepMocked<PrismaService>;
  let taskService: DeepMocked<TaskService>;

  beforeEach(() => {
    jest.clearAllMocks();

    prisma = createMock<PrismaService>({
      metric: {
        findMany: jest.fn().mockResolvedValue(prismaMetricMocks),
        findFirst: jest
          .fn()
          .mockResolvedValue(prismaMetricWithResourceAndProject),
        update: jest.fn().mockResolvedValue(prismaMetricMocks[0]),
        create: jest.fn().mockResolvedValue(prismaMetricMocks[0]),
      },
      resource: {
        findFirst: jest.fn().mockResolvedValue({
          id: '1',
          name: 'resource',
          params: '[{ "name": "resourceParam" }]',
          project: { id: '1', name: 'project' },
        }),
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

  describe('convertToTask method', () => {
    it('should be defined', () => {
      expect(service).toBeDefined();
    });

    it('should throw an error if provided JSON is invalid', async () => {
      await expect(
        service.convertToTask({ ...metricMocks[0], params: '[[[' }),
      ).rejects.toThrow();
    });

    it('should look up resource and project names in db', async () => {
      const resourceFindSpy = jest.spyOn(prisma.resource, 'findFirst');
      const result = await service.convertToTask({
        ...metricMocks[0],
        params: JSON.stringify(validParams),
      });

      expect(resourceFindSpy).toHaveBeenCalled();
    });

    it('should return a task', async () => {
      const result = await service.convertToTask({
        ...metricMocks[0],
        params: JSON.stringify(validParams),
      });

      expect(result.weight).toBeDefined();
      expect(result.update_rate).toBeDefined();

      expect(result.groups).toContain('project:project');
      expect(result.groups).toContain('resource:resource');
    });

    it('should throw an error if weight is not defined', async () => {
      await expect(
        service.convertToTask({
          ...metricMocks[0],
          params: JSON.stringify({ ...validParams, weight: undefined }),
        }),
      ).rejects.toThrow();
    });

    it('should throw an error if updateRate is not defined', async () => {
      await expect(
        service.convertToTask({
          ...metricMocks[0],
          params: JSON.stringify({ ...validParams, updateRate: undefined }),
        }),
      ).rejects.toThrow();
    });

    it("should merge resource's params with metric's params", async () => {
      const result = await service.convertToTask({
        ...metricMocks[0],
        params: JSON.stringify(validParams),
      });

      const data = JSON.parse(result.data);

      expect(data.find((d) => d.name === 'resourceParam')).toBeDefined();
      expect(data.find((d) => d.name === 'metricParam')).toBeDefined();
    });
  });

  describe('start method', () => {
    it('should be defined', () => {
      expect(service.start).toBeDefined();
    });

    it('should call its own convertToTask method', async () => {
      const convertToTaskMock = jest
        .spyOn(service, 'convertToTask')
        .mockResolvedValueOnce({} as any);

      await service.start(metricMocks[0]);

      expect(convertToTaskMock).toHaveBeenCalled();
    });

    it('should call taskService.start with converted task', async () => {
      jest.spyOn(service, 'convertToTask').mockResolvedValueOnce('test' as any);

      await service.start(metricMocks[0]);

      expect(taskService.start).toHaveBeenCalledWith('test');
    });
  });

  describe('update method', () => {
    it('should be defined', () => {
      expect(service.update).toBeDefined();
    });

    it('should call its own convertToTask method', async () => {
      const convertToTaskMock = jest
        .spyOn(service, 'convertToTask')
        .mockResolvedValueOnce({} as any);

      await service.update(metricMocks[0]);

      expect(convertToTaskMock).toHaveBeenCalled();
    });

    it('should call taskService.update with converted task', async () => {
      jest.spyOn(service, 'convertToTask').mockResolvedValueOnce('test' as any);

      await service.update(metricMocks[0]);

      expect(taskService.update).toHaveBeenCalledWith('test');
    });
  });

  describe('stop method', () => {
    it('should be defined', () => {
      expect(service.stop).toBeDefined();
    });

    it('should find metric in db', async () => {
      const findFirstSpy = jest.spyOn(prisma.metric, 'findFirst');

      await service.stop(metricMocks[0].id);

      expect(findFirstSpy).toHaveBeenCalled();
    });

    it("should call taskService.stop with metric's groups", async () => {
      await service.stop(metricMocks[0].id);

      expect(taskService.stop).toHaveBeenCalledWith({
        metric: metricMocks[0].name,
        groups: ['project:project', 'resource:resource'],
      });
    });

    it('should throw an error if metric is not found', async () => {
      jest.spyOn(prisma.metric, 'findFirst').mockResolvedValueOnce(null);

      await expect(service.stop('test')).rejects.toThrow();
    });

    it('should throw an error if resource not found', async () => {
      jest.spyOn(prisma.metric, 'findFirst').mockResolvedValueOnce({
        ...prismaMetricWithResourceAndProject,
        resource: null,
      } as any);
      jest.spyOn(prisma.metric, 'findFirst').mockResolvedValueOnce({
        ...prismaMetricWithResourceAndProject,
        resource: {
          ...prismaMetricWithResourceAndProject.resource,
          name: null,
        },
      } as any);

      await expect(service.stop('test')).rejects.toThrow();
      await expect(service.stop('test')).rejects.toThrow();
    });

    it('should throw an error if project not found', async () => {
      jest.spyOn(prisma.metric, 'findFirst').mockResolvedValueOnce({
        ...prismaMetricWithResourceAndProject,
        resource: {
          ...prismaMetricWithResourceAndProject.resource,
          project: null,
        },
      } as any);
      jest.spyOn(prisma.metric, 'findFirst').mockResolvedValueOnce({
        ...prismaMetricWithResourceAndProject,
        resource: {
          ...prismaMetricWithResourceAndProject.resource,
          project: {
            ...prismaMetricWithResourceAndProject.resource.project,
            name: null,
          },
        },
      } as any);

      await expect(service.stop('test')).rejects.toThrow();
      await expect(service.stop('test')).rejects.toThrow();
    });
  });

  describe('create method', () => {
    it('should be defined', () => {
      expect(service.create).toBeDefined();
    });

    it('should throw an error if metric params config is not found', async () => {
      jest.spyOn(service, 'start').mockResolvedValue({} as any);

      jest
        .spyOn(metricParamsModule, 'metricParams', 'get')
        .mockResolvedValueOnce({} as never);

      await expect(service.create(metricMocks[0])).rejects.toThrow();
    });

    it('should throw an error if metric params config is not defined', async () => {
      jest.spyOn(service, 'start').mockResolvedValue({} as any);

      jest
        .spyOn(metricParamsModule, 'metricParams', 'get')
        .mockResolvedValueOnce({} as never);

      await expect(
        service.create({ ...metricMocks[0], name: 'Test' }),
      ).rejects.toThrow();
    });

    it('should throw an error if metric dependencies are not defined', async () => {
      jest.spyOn(service, 'start').mockResolvedValue({} as any);

      jest
        .spyOn(metricDependenciesModule, 'metricDependencies', 'get')
        .mockResolvedValueOnce({} as never);

      await expect(
        service.create({ ...metricMocks[0], name: 'Test' }),
      ).rejects.toThrow();
    });

    it('should throw an error if metric has failed to start', async () => {
      jest.spyOn(service, 'start').mockImplementationOnce(async () => {
        throw new Error();
      });

      await expect(
        service.create({ ...metricMocks[0], name: 'Test' }),
      ).rejects.toThrow();
    });

    it('should call its own create method when everything is ok', async () => {
      jest.spyOn(service, 'start').mockResolvedValue({} as any);

      await service.create({ ...metricMocks[0], name: 'Test' });

      expect(prisma.metric.create).toHaveBeenCalled();
    });
  });
});
