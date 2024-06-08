import { ProjectController } from './project.controller';
import {
  projectCreateDTOMocks,
  projectDetailedDTOMocks,
  projectDetailedMocks,
  projectDetailedWithSnapshotsDTOMocks,
  projectDetailedWithSnapshotsMocks,
  projectDTOMocks,
  projectInListMocks,
  projectMocks,
} from './project.mock';
import { ProjectService } from './project.service';
import { DeepMocked, createMock } from '@golevelup/ts-jest';

describe('ProjectController', () => {
  let controller: ProjectController;
  let serviceMock: DeepMocked<ProjectService>;

  beforeEach(async () => {
    serviceMock = createMock<ProjectService>();
    controller = new ProjectController(serviceMock);
  });

  describe('findAll method', () => {
    it("should call the projectService's findAll method", async () => {
      const result = projectInListMocks;

      serviceMock.findAll.mockResolvedValue(result);

      await controller.findAll();

      expect(serviceMock.findAll).toHaveBeenCalled();
    });

    it('should return an array of projects', async () => {
      const result = projectInListMocks;

      serviceMock.findAll.mockResolvedValueOnce(result);

      const response = await controller.findAll();

      expect(response).toEqual(projectInListMocks);
    });
  });

  describe('findOne method', () => {
    it("should call the projectService's findOne method", async () => {
      const result = projectDetailedWithSnapshotsMocks[0];

      serviceMock.findOne.mockResolvedValueOnce(result);

      await controller.findOne(result.id);

      expect(serviceMock.findOne).toHaveBeenCalled();
      expect(serviceMock.findOne).toHaveBeenCalledWith(result.id);
    });

    it('should return a projectDetailedWithSnapshotsDTO', async () => {
      const result = projectDetailedWithSnapshotsMocks[0];
      const resultDTO = projectDetailedWithSnapshotsDTOMocks[0];

      serviceMock.findOne.mockResolvedValueOnce(result);

      expect(await controller.findOne(result.id)).toEqual(resultDTO);
    });

    it('should return null if project not found', async () => {
      serviceMock.findOne.mockResolvedValueOnce(null);

      expect(await controller.findOne('test')).toBeNull();
    });
  });

  describe('create method', () => {
    it("should call the projectService's create method", async () => {
      const result = projectCreateDTOMocks[0];

      serviceMock.create.mockResolvedValueOnce(null);

      await controller.create(result);

      expect(serviceMock.create).toHaveBeenCalled();
      expect(serviceMock.create).toHaveBeenCalledWith(result);
    });

    it('should return the created project', async () => {
      const result = projectDetailedMocks[0];
      const resultDTO = projectDetailedDTOMocks[0];

      serviceMock.create.mockResolvedValueOnce(result);

      expect(await controller.create({ name: 'test' })).toEqual(resultDTO);
    });

    it('should return null if project not created', async () => {
      serviceMock.create.mockResolvedValueOnce(null);

      expect(await controller.create({ name: 'test' })).toBeNull();
    });
  });

  describe('update method', () => {
    it("should call the projectService's updateOne method", async () => {
      const result = projectMocks[0];

      serviceMock.updateOne.mockResolvedValueOnce(result);

      await controller.update(projectDTOMocks[0]);

      expect(serviceMock.updateOne).toHaveBeenCalled();
      expect(serviceMock.updateOne).toHaveBeenCalledWith(result);
    });

    it('should return the updated project', async () => {
      const result = projectMocks[0];
      const resultDTO = projectDTOMocks[0];

      serviceMock.updateOne.mockResolvedValueOnce(result);

      expect(await controller.update(resultDTO)).toEqual(resultDTO);
    });
  });

  describe('delete method', () => {
    it("should call the projectService's deleteOne method", async () => {
      const result = projectMocks[0];

      serviceMock.deleteOne.mockResolvedValueOnce(result);

      await controller.delete(result.id);

      expect(serviceMock.deleteOne).toHaveBeenCalled();
      expect(serviceMock.deleteOne).toHaveBeenCalledWith(result.id);
    });

    it('should return the deleted project', async () => {
      const result = projectMocks[0];
      const resultDTO = projectDTOMocks[0];

      serviceMock.deleteOne.mockResolvedValueOnce(result);

      expect(await controller.delete(result.id)).toEqual(resultDTO);
    });
  });
});
