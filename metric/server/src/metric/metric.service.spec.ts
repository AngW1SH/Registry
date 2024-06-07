import { DeepMocked, createMock } from '@golevelup/ts-jest';
import { PrismaService } from '../prisma/prisma.service';
import { MetricService } from './metric.service';
import { metricMocks, prismaMetricMocks } from './metric.mock';
import { TaskService } from '../task/task.service';
import { MetricName } from './config/instances/metricNames';
import { MetricParam, MetricParamType, UnitOfTime } from './config/types';
import * as metricConfigModule from './config/instances/metricConfig';
import { snapshotMocks } from '../metric-gateway/gateway.mock';
import { PlatformName } from '../platform/platform.entity';

const validParams: MetricParam[] = [
  {
    name: 'weight',
    type: MetricParamType.text,
    value: '1',
  },
  {
    name: 'updateRate',
    type: MetricParamType.duration,
    value: {
      number: 2,
      unitOfTime: UnitOfTime.weeks,
    },
  },
  {
    name: 'metricParam',
    type: MetricParamType.text,
    value: 'metricParam',
  },
];

const validTask = {
  metric: 'Test',
  delete_snapshots: false,
  groups: ['project:project-1', 'resource:resource-1'],
};

jest.mock('./config/instances/metricConfig', () => ({
  ...jest.requireActual('./config/instances/metricConfig'),
  get metricConfig() {
    return {
      Test: {
        dependencies: [],
        snapshotBased: true,
        isPublic: true,
        platform: PlatformName.GitHub,
        params: validParams,
      },
      TestDependency1: {
        dependencies: ['Test'],
        snapshotBased: true,
        isPublic: true,
        platform: PlatformName.GitHub,
        params: validParams,
      },
      TestDependency2: {
        dependencies: ['Test'],
        snapshotBased: true,
        isPublic: true,
        platform: PlatformName.GitHub,
        params: validParams,
      },
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
        delete: jest.fn().mockResolvedValue(prismaMetricMocks[0]),
      },
      resource: {
        findFirst: jest.fn().mockResolvedValue({
          id: '1',
          name: 'resource',
          params: '[{ "name": "resourceParam" }]',
          platform: PlatformName.GitHub,
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

      expect(result).toEqual(
        metricMocks.map((m) => expect.objectContaining(m)),
      );
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

      const names = Object.values(MetricName);

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

      const result = await service.updateParams({
        ...metricMocks[0],
        name: 'Test',
      });

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

      await expect(
        service.updateParams({ ...metricMocks[0], name: 'Test' }),
      ).rejects.toThrow();
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
        name: 'Test',
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

      await service.stop(metricMocks[0].id, false);

      expect(findFirstSpy).toHaveBeenCalled();
    });

    it("should call taskService.stop with metric's groups", async () => {
      await service.stop(metricMocks[0].id, false);

      expect(taskService.stop).toHaveBeenCalledWith(
        expect.objectContaining({
          metric: metricMocks[0].name,
          groups: ['project:project', 'resource:resource'],
        }),
      );
    });

    it('should throw an error if metric is not found', async () => {
      jest.spyOn(prisma.metric, 'findFirst').mockResolvedValueOnce(null);

      await expect(service.stop('test', false)).rejects.toThrow();
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

      await expect(service.stop('test', false)).rejects.toThrow();
      await expect(service.stop('test', false)).rejects.toThrow();
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

      await expect(service.stop('test', false)).rejects.toThrow();
      await expect(service.stop('test', false)).rejects.toThrow();
    });
  });

  describe('create method', () => {
    it('should be defined', () => {
      expect(service.create).toBeDefined();
    });

    it('should throw an error if metric params config is not found', async () => {
      jest.spyOn(service, 'start').mockResolvedValue({} as any);

      jest
        .spyOn(metricConfigModule, 'metricConfig', 'get')
        .mockResolvedValueOnce({} as never);

      await expect(service.create(metricMocks[0])).rejects.toThrow();
    });

    it('should throw an error if metric params config is not defined', async () => {
      jest.spyOn(service, 'start').mockResolvedValue({} as any);

      jest
        .spyOn(metricConfigModule, 'metricConfig', 'get')
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

    it('should create metric when everything is ok', async () => {
      jest.spyOn(service, 'start').mockResolvedValue({ id: 123 } as any);

      await service.create({ ...metricMocks[0], name: 'Test' });

      expect(prisma.metric.create).toHaveBeenCalled();
    });
  });

  describe('deleteOne method', () => {
    it('should be defined', () => {
      expect(service.deleteOne).toBeDefined();
    });

    it('should throw an error if metric is not found', async () => {
      jest.spyOn(service, 'stop').mockResolvedValue({} as any);
      jest.spyOn(prisma.metric, 'delete').mockResolvedValueOnce(null);

      await expect(service.deleteOne('test')).rejects.toThrow();
    });

    it('should call its own stop method', async () => {
      jest.spyOn(service, 'stop').mockResolvedValue({} as any);

      await service.deleteOne('test');

      expect(service.stop).toHaveBeenCalled();
    });

    it('should throw an error if failed to stop the metric', async () => {
      jest.spyOn(service, 'stop').mockImplementationOnce(async () => {
        throw new Error();
      });

      await expect(service.deleteOne('test')).rejects.toThrow();
    });

    it("shouldn't delete the metric if failed to stop the metric", async () => {
      jest.spyOn(service, 'stop').mockImplementationOnce(async () => {
        throw new Error();
      });

      await expect(service.deleteOne('test')).rejects.toThrow();

      expect(prisma.metric.delete).not.toHaveBeenCalled();
    });

    it('should return the deleted metric', async () => {
      jest.spyOn(service, 'stop').mockResolvedValue({} as any);

      jest
        .spyOn(prisma.metric, 'delete')
        .mockResolvedValueOnce(prismaMetricWithResourceAndProject);

      const result = await service.deleteOne('test');

      expect(result).toEqual(
        expect.objectContaining({
          id: prismaMetricWithResourceAndProject.id,
          name: prismaMetricWithResourceAndProject.name,
          resource: prismaMetricWithResourceAndProject.resourceId,
          params: prismaMetricWithResourceAndProject.params,
        }),
      );
    });
  });

  describe('populateWithSnapshots method', () => {
    it('should be defined', () => {
      expect(service.populateWithSnapshots).toBeDefined();
    });

    it('should parse snapshot data', () => {
      jest.spyOn(JSON, 'parse');

      service.populateWithSnapshots(metricMocks[0], snapshotMocks);

      expect(JSON.parse).toHaveBeenCalled();
    });

    it("shouldn't call JSON.parse if snapshot data is empty", () => {
      jest.spyOn(JSON, 'parse');

      service.populateWithSnapshots(
        metricMocks[0],
        snapshotMocks.map((snapshot) => ({ ...snapshot, data: '' })),
      );
      service.populateWithSnapshots(
        metricMocks[0],
        snapshotMocks.map((snapshot) => ({ ...snapshot, data: null })),
      );

      expect(JSON.parse).not.toHaveBeenCalled();
    });
  });

  describe('execute method', () => {
    it('should be defined', () => {
      expect(service.execute).toBeDefined();
    });

    it('should call its own convertToTask method', async () => {
      jest.spyOn(service, 'convertToTask').mockResolvedValue(validTask as any);

      await service.execute({ ...metricMocks[0], name: 'Test' });

      expect(service.convertToTask).toHaveBeenCalled();
    });

    it('should throw an error if failed to convert the metric', async () => {
      jest.spyOn(service, 'convertToTask').mockImplementationOnce(async () => {
        throw new Error();
      });

      jest.spyOn(service, 'convertToTask').mockResolvedValue({
        ...validTask,
        groups: undefined,
      } as any);
      jest.spyOn(service, 'convertToTask').mockResolvedValue({
        ...validTask,
        metric: undefined,
      } as any);

      await expect(service.execute(metricMocks[0])).rejects.toThrow();
      await expect(service.execute(metricMocks[0])).rejects.toThrow();
      await expect(service.execute(metricMocks[0])).rejects.toThrow();
    });

    it('should call taskService.forceExecute', async () => {
      jest.spyOn(service, 'convertToTask').mockResolvedValue(validTask as any);

      await service.execute({ ...metricMocks[0], name: 'Test' });

      expect(taskService.forceExecute).toHaveBeenCalled();
    });

    it('should throw an error if failed to execute the metric', async () => {
      jest
        .spyOn(taskService, 'forceExecute')
        .mockImplementationOnce(async () => {
          throw new Error();
        });

      await expect(service.execute(metricMocks[0])).rejects.toThrow();
    });
  });
});
