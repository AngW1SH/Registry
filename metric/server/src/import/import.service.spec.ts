import { DeepMocked, createMock } from '@golevelup/ts-jest';
import { ImportService } from './import.service';
import { PrismaService } from '../prisma/prisma.service';
import { ProjectService } from '../project/project.service';
import { ResourceService } from '../resource/resource.service';
import { projectMocks } from '../project/project.mock';
import { importProjectMock } from './import.mock';
import { resourceMocks } from '../resource/resource.mock';

describe('ImportService', () => {
  let service: ImportService;
  let prisma: DeepMocked<PrismaService>;
  let projectService: DeepMocked<ProjectService>;
  let resourceService: DeepMocked<ResourceService>;

  beforeEach(() => {
    jest.clearAllMocks();

    prisma = createMock<PrismaService>({
      project: {
        findFirst: jest.fn().mockResolvedValue(projectMocks[0]),
        create: jest.fn().mockResolvedValue(projectMocks[0]),
      },
      resource: {
        findFirst: jest.fn().mockResolvedValue(resourceMocks[0]),
        create: jest.fn().mockResolvedValue(resourceMocks[0]),
        update: jest.fn().mockResolvedValue(resourceMocks[0]),
      },
      user: {
        findFirst: jest.fn().mockResolvedValue({}),
        update: jest.fn().mockResolvedValue({}),
        create: jest.fn().mockResolvedValue({}),
      },
      member: {
        findFirst: jest.fn().mockResolvedValue({}),
        create: jest.fn().mockResolvedValue({}),
        update: jest.fn().mockResolvedValue({}),
      },
      identifier: {
        deleteMany: jest.fn().mockResolvedValue([]),
      },
    });
    projectService = createMock<ProjectService>();
    resourceService = createMock<ResourceService>();

    service = new ImportService(prisma, projectService, resourceService);
  });

  describe('createOrUpdateProject', () => {
    it('should try to find the project in the database', async () => {
      await service.createOrUpdateProject(importProjectMock);
      expect(prisma.project.findFirst).toHaveBeenCalled();
    });

    it("should try to create the project if it doesn't exist", async () => {
      jest.spyOn(prisma.project, 'findFirst').mockResolvedValue(null);

      await service.createOrUpdateProject(importProjectMock);
      expect(prisma.project.create).toHaveBeenCalled();
    });

    it('should try to update the project using the projectService if the project exists', async () => {
      jest
        .spyOn(prisma.project, 'findFirst')
        .mockResolvedValue(projectMocks[0] as any);

      await service.createOrUpdateProject(importProjectMock);

      expect(projectService.updateOne).toHaveBeenCalled();
    });
  });

  describe('createOrUpdateResource', () => {
    it('should try to find the resource in the database', async () => {
      await service.createOrUpdateResource(
        importProjectMock.resources[0],
        projectMocks[0],
      );
      expect(prisma.resource.findFirst).toHaveBeenCalled();
    });

    it("should try to create the resource if it doesn't exist", async () => {
      jest.spyOn(prisma.resource, 'findFirst').mockResolvedValue(null as any);

      await service.createOrUpdateResource(
        importProjectMock.resources[0],
        projectMocks[0],
      );
      expect(prisma.resource.create).toHaveBeenCalled();
    });

    it('should try to update the resource if it exists', async () => {
      jest
        .spyOn(prisma.resource, 'findFirst')
        .mockResolvedValue(resourceMocks[0] as any);

      await service.createOrUpdateResource(
        importProjectMock.resources[0],
        projectMocks[0],
      );
      expect(prisma.resource.update).toHaveBeenCalled();
    });

    it('should throw if the platform is not supported', async () => {
      const resource = {
        ...importProjectMock.resources[0],
        platform: 'unknown' as any,
      };
      await expect(
        service.createOrUpdateResource(resource, projectMocks[0]),
      ).rejects.toThrow();
    });

    it("should create all metrics for the resource if it didn't exist", async () => {
      jest.spyOn(prisma.resource, 'findFirst').mockResolvedValue(null as any);

      await service.createOrUpdateResource(
        importProjectMock.resources[0],
        projectMocks[0],
      );

      expect(resourceService.createAllMetrics).toHaveBeenCalledTimes(1);
    });

    it('should not create any metrics if the resource already exists', async () => {
      jest
        .spyOn(prisma.resource, 'findFirst')
        .mockResolvedValue(resourceMocks[0] as any);

      await service.createOrUpdateResource(
        importProjectMock.resources[0],
        projectMocks[0],
      );

      expect(resourceService.createAllMetrics).toHaveBeenCalledTimes(0);
    });

    it('should start tracking all the created metrics', async () => {
      jest.spyOn(prisma.resource, 'findFirst').mockResolvedValue(null as any);

      await service.createOrUpdateResource(
        importProjectMock.resources[0],
        projectMocks[0],
      );

      expect(resourceService.startTracking).toHaveBeenCalledTimes(1);
    });

    it("shouldn't start tracking metrics if the resource already exists", async () => {
      jest
        .spyOn(prisma.resource, 'findFirst')
        .mockResolvedValue(resourceMocks[0] as any);

      await service.createOrUpdateResource(
        importProjectMock.resources[0],
        projectMocks[0],
      );

      expect(resourceService.startTracking).toHaveBeenCalledTimes(0);
    });
  });

  describe('createOrUpdateUser', () => {
    it('should try to find the user in the database', async () => {
      await service.createOrUpdateUser(importProjectMock.members[0]);
      expect(prisma.user.findFirst).toHaveBeenCalled();
    });

    it("should try to create the user if it doesn't exist", async () => {
      jest.spyOn(prisma.user, 'findFirst').mockResolvedValue(null as any);

      await service.createOrUpdateUser(importProjectMock.members[0]);
      expect(prisma.user.create).toHaveBeenCalled();
    });

    it('should try to update the user if it exists', async () => {
      jest
        .spyOn(prisma.user, 'findFirst')
        .mockResolvedValue({ id: '1' } as any);

      await service.createOrUpdateUser(importProjectMock.members[0]);
      expect(prisma.user.update).toHaveBeenCalled();
    });

    it('should delete all existing identifiers for the user if it exists', async () => {
      jest
        .spyOn(prisma.user, 'findFirst')
        .mockResolvedValue({ id: '1' } as any);

      await service.createOrUpdateUser(importProjectMock.members[0]);
      expect(prisma.identifier.deleteMany).toHaveBeenCalled();
    });

    it("should throw if an identifier's platform is not supported", async () => {
      const user = {
        ...importProjectMock.members[0],
        identifiers: [
          {
            platform: 'unknown' as any,
            value: 'test',
          },
        ],
      };

      await expect(service.createOrUpdateUser(user)).rejects.toThrow();
    });
  });

  describe('createOrUpdateMember', () => {
    it('should try to find the member in the database', async () => {
      await service.createOrUpdateMember(
        importProjectMock.members[0],
        projectMocks[0],
        { id: '1' } as any,
      );
      expect(prisma.member.findFirst).toHaveBeenCalled();
    });

    it("should create the member if it doesn't exist", async () => {
      jest.spyOn(prisma.member, 'findFirst').mockResolvedValue(null);

      await service.createOrUpdateMember(
        importProjectMock.members[0],
        projectMocks[0],
        { id: '1' } as any,
      );
      expect(prisma.member.create).toHaveBeenCalled();
    });

    it('should update the member if it exists', async () => {
      jest
        .spyOn(prisma.member, 'findFirst')
        .mockResolvedValue({ id: '1' } as any);
    });
  });

  describe('project', () => {
    it('should create or update the project', async () => {
      jest
        .spyOn(service, 'createOrUpdateProject')
        .mockReturnValueOnce(projectMocks[0] as any);
      await service.createOrUpdateProject(importProjectMock);

      expect(service.createOrUpdateProject).toHaveBeenCalledWith(
        importProjectMock,
      );
    });

    it('should create or update all the resources', async () => {
      jest
        .spyOn(service, 'createOrUpdateProject')
        .mockReturnValueOnce(projectMocks[0] as any);
      jest
        .spyOn(service, 'createOrUpdateResource')
        .mockReturnValue(resourceMocks[0] as any);

      await service.project(importProjectMock);

      expect(service.createOrUpdateResource).toHaveBeenCalledTimes(
        importProjectMock.resources.length,
      );
    });

    it('should create or update all the users', async () => {
      jest
        .spyOn(service, 'createOrUpdateProject')
        .mockReturnValueOnce(projectMocks[0] as any);
      jest
        .spyOn(service, 'createOrUpdateResource')
        .mockReturnValue(resourceMocks[0] as any);

      jest
        .spyOn(service, 'createOrUpdateUser')
        .mockReturnValue({ id: '1' } as any);

      await service.project(importProjectMock);

      expect(service.createOrUpdateUser).toHaveBeenCalledTimes(
        importProjectMock.members.length,
      );
    });

    it('should create or update all the members', async () => {
      jest
        .spyOn(service, 'createOrUpdateProject')
        .mockReturnValueOnce(projectMocks[0] as any);
      jest
        .spyOn(service, 'createOrUpdateResource')
        .mockReturnValue(resourceMocks[0] as any);

      jest
        .spyOn(service, 'createOrUpdateUser')
        .mockReturnValue({ id: '1' } as any);

      jest
        .spyOn(service, 'createOrUpdateMember')
        .mockReturnValue({ id: '1' } as any);

      await service.project(importProjectMock);

      expect(service.createOrUpdateMember).toHaveBeenCalledTimes(
        importProjectMock.members.length,
      );
    });

    it('should return all the generated data', async () => {
      jest
        .spyOn(service, 'createOrUpdateProject')
        .mockReturnValueOnce(projectMocks[0] as any);
      jest
        .spyOn(service, 'createOrUpdateResource')
        .mockReturnValue(resourceMocks[0] as any);

      jest
        .spyOn(service, 'createOrUpdateUser')
        .mockReturnValue({ id: '1' } as any);

      jest
        .spyOn(service, 'createOrUpdateMember')
        .mockReturnValue({ id: '1' } as any);

      const data = await service.project(importProjectMock);

      expect(data).toEqual({
        project: projectMocks[0],
        resources: [resourceMocks[0]],
        users: [{ id: '1' }],
        members: [{ id: '1' }],
      });
    });
  });
});
