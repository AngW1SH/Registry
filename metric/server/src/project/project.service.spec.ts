import { DeepMocked, createMock } from '@golevelup/ts-jest';
import { PrismaService } from '../prisma/prisma.service';
import { SnapshotService } from '../snapshot/snapshot.service';
import { TaskService } from '../task/task.service';
import { ProjectService } from './project.service';
import { ResourceService } from '../resource/resource.service';
import {
  projectCreateMocks,
  projectDetailedDTOMocks,
  projectDetailedMocks,
  projectInListMocks,
  projectMocks,
} from './project.mock';
import { structureSnapshots } from './utils/structureSnapshots';
import { resourceWithMetricsMocks } from '../resource/resource.mock';
import { markTrackedMetrics } from './utils/markTrackedMetrics';

jest.mock('./utils/structureSnapshots', () => ({
  structureSnapshots: jest.fn().mockReturnValue([]),
}));

jest.mock('./utils/markTrackedMetrics', () => ({
  markTrackedMetrics: jest.fn().mockReturnValue([]),
}));

describe('ProjectService', () => {
  let service: ProjectService;
  let prisma: DeepMocked<PrismaService>;
  let resourceService: DeepMocked<ResourceService>;
  let snapshotService: DeepMocked<SnapshotService>;
  let taskService: DeepMocked<TaskService>;

  beforeEach(async () => {
    prisma = createMock<PrismaService>({
      project: {
        findFirst: jest.fn().mockResolvedValue({
          ...projectDetailedDTOMocks[0],
          members: [],
        } as any),
        findMany: jest.fn().mockResolvedValue([]),
        create: jest.fn().mockResolvedValue(projectMocks[0]),
        update: jest.fn().mockResolvedValue(projectMocks[0]),
        delete: jest.fn().mockResolvedValue(projectMocks[0]),
      },
    });
    taskService = createMock<TaskService>({
      list: jest.fn().mockResolvedValue([]),
    });
    snapshotService = createMock<SnapshotService>({
      list: jest.fn().mockResolvedValue([]),
    });
    resourceService = createMock<ResourceService>({
      findMany: jest.fn().mockResolvedValue(resourceWithMetricsMocks),
    });
    service = new ProjectService(
      prisma,
      resourceService,
      snapshotService,
      taskService,
    );
  });

  describe('findAll method', () => {
    it('should be defined', () => {
      expect(service.findAll).toBeDefined();
    });
  });

  describe('findOne method', () => {
    it('should be defined', () => {
      expect(service.findOne).toBeDefined();
    });

    it('should call prisma.project.findFirst with the project id', async () => {
      await service.findOne(projectMocks[0].id);

      expect(prisma.project.findFirst).toHaveBeenCalledWith(
        expect.objectContaining({
          where: expect.objectContaining({ id: projectMocks[0].id }),
        }),
      );
    });

    it("should return null if project doesn't exist", async () => {
      jest.spyOn(prisma.project, 'findFirst').mockResolvedValueOnce(null);

      expect(await service.findOne(projectMocks[0].id)).toBeNull();
    });

    it('should call resourceService.findMany with the project id', async () => {
      await service.findOne(projectMocks[0].id);

      expect(resourceService.findMany).toHaveBeenCalledWith({
        project: projectMocks[0].id,
      });
    });

    it('should throw an error if failed to fetch resources', async () => {
      jest
        .spyOn(resourceService, 'findMany')
        .mockRejectedValueOnce(new Error('Failed to fetch resources'));

      await expect(service.findOne(projectMocks[0].id)).rejects.toThrow();
    });

    it('should call taskService.list with the project:project-name group', async () => {
      await service.findOne(projectMocks[0].id);

      expect(taskService.list).toHaveBeenCalledWith([
        `project:${projectMocks[0].name}`,
      ]);
    });

    it('should throw an error if failed to fetch tracked tasks', async () => {
      jest
        .spyOn(taskService, 'list')
        .mockRejectedValueOnce(new Error('Failed to fetch tracked tasks'));

      await expect(service.findOne(projectMocks[0].id)).rejects.toThrow();
    });

    it('should structure snapshots', async () => {
      await service.findOne(projectMocks[0].id);

      expect(structureSnapshots).toHaveBeenCalled();
    });

    it('should throw an error if failed to structure snapshots', async () => {
      jest
        .spyOn(snapshotService, 'list')
        .mockRejectedValueOnce(new Error('Failed to structure snapshots'));

      await expect(service.findOne(projectMocks[0].id)).rejects.toThrow();
    });

    it('should call resourceService.populateWithSnapshots for each resource', async () => {
      jest
        .spyOn(resourceService, 'findMany')
        .mockResolvedValueOnce(resourceWithMetricsMocks);

      await service.findOne(projectMocks[0].id);

      expect(resourceService.populateWithSnapshots).toHaveBeenCalledTimes(
        resourceWithMetricsMocks.length,
      );
    });
  });

  describe('create method', () => {
    it('should be defined', () => {
      expect(service.create).toBeDefined();
    });

    it('should call prisma.project.create with the project name', async () => {
      await service.create(projectCreateMocks[0]);

      expect(prisma.project.create).toHaveBeenCalledWith(
        expect.objectContaining({
          data: expect.objectContaining({ name: projectCreateMocks[0].name }),
        }),
      );
    });

    it('should throw an error if failed to create project', async () => {
      jest.spyOn(prisma.project, 'create').mockResolvedValueOnce(null);
      jest
        .spyOn(prisma.project, 'create')
        .mockRejectedValueOnce(new Error('Failed to create project'));

      await expect(service.create(projectCreateMocks[0])).rejects.toThrow();
      await expect(service.create(projectCreateMocks[0])).rejects.toThrow();
    });

    it('should return a ProjectDetailed', async () => {
      jest
        .spyOn(prisma.project, 'create')
        .mockResolvedValueOnce(projectDetailedMocks[0] as any);
      const result = await service.create(projectCreateMocks[0]);

      expect(result).toEqual({ ...projectDetailedMocks[0], resources: [] });
    });
  });

  describe('updateOne method', () => {
    it('should be defined', () => {
      expect(service.updateOne).toBeDefined();
    });

    it('should call prisma.project.update with the project id', async () => {
      await service.updateOne(projectMocks[0]);

      expect(prisma.project.update).toHaveBeenCalledWith(
        expect.objectContaining({
          where: expect.objectContaining({ id: projectMocks[0].id }),
        }),
      );
    });

    it('should throw an error if failed to update project', async () => {
      jest.spyOn(prisma.project, 'update').mockResolvedValueOnce(null);
      jest
        .spyOn(prisma.project, 'update')
        .mockRejectedValueOnce(new Error('Failed to update project'));

      await expect(service.updateOne(projectMocks[0])).rejects.toThrow();
      await expect(service.updateOne(projectMocks[0])).rejects.toThrow();
    });

    it('should return a project', async () => {
      jest
        .spyOn(prisma.project, 'update')
        .mockResolvedValueOnce(projectMocks[0] as any);
      const result = await service.updateOne(projectMocks[0]);

      expect(result).toEqual(projectMocks[0]);
    });
  });

  describe('deleteOne method', () => {
    it('should be defined', () => {
      expect(service.deleteOne).toBeDefined();
    });

    it('should call prisma.project.delete with the project id', async () => {
      await service.deleteOne(projectMocks[0].id);

      expect(prisma.project.delete).toHaveBeenCalledWith(
        expect.objectContaining({
          where: expect.objectContaining({ id: projectMocks[0].id }),
        }),
      );
    });

    it('should throw an error if failed to delete project', async () => {
      jest.spyOn(prisma.project, 'delete').mockResolvedValueOnce(null);

      jest
        .spyOn(prisma.project, 'delete')
        .mockRejectedValueOnce(new Error('Failed to delete project'));

      await expect(service.deleteOne(projectMocks[0].id)).rejects.toThrow();
      await expect(service.deleteOne(projectMocks[0].id)).rejects.toThrow();
    });

    it('should return a project', async () => {
      jest
        .spyOn(prisma.project, 'delete')
        .mockResolvedValueOnce(projectMocks[0] as any);
      const result = await service.deleteOne(projectMocks[0].id);

      expect(result).toEqual(projectMocks[0]);
    });
  });
});
