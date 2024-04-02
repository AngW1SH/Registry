import { DeepMocked, createMock } from '@golevelup/ts-jest';
import { ResourceController } from './resource.controller';
import { ResourceService } from './resource.service';
import {
  resourceCreateDTOMocks,
  resourceCreateMocks,
  resourceDTOMocks,
  resourceDetailedDTOMocks,
  resourceDetailedMocks,
  resourceMocks,
} from './resource.mock';

describe('ResourceController', () => {
  let controller: ResourceController;
  let serviceMock: DeepMocked<ResourceService>;

  beforeEach(async () => {
    serviceMock = createMock<ResourceService>();
    controller = new ResourceController(serviceMock);
  });

  describe('findOne method', () => {
    it('should be defined', () => {
      expect(controller.findOne).toBeDefined();
    });

    it("should call the resourceService's findOne method", async () => {
      const result = resourceDetailedMocks[0];

      serviceMock.findOne.mockResolvedValueOnce(result);

      await controller.findOne(result.id);

      expect(serviceMock.findOne).toHaveBeenCalled();
      expect(serviceMock.findOne).toHaveBeenCalledWith(result.id);
    });

    it('should return a ResourceDetailedDTO', async () => {
      const result = resourceDetailedMocks[0];
      const resultDTO = resourceDetailedDTOMocks[0];

      serviceMock.findOne.mockResolvedValueOnce(result);

      expect(await controller.findOne(result.id)).toEqual(resultDTO);
    });

    it('should return null if resource not found', async () => {
      serviceMock.findOne.mockResolvedValueOnce(null);

      expect(await controller.findOne('1')).toBeNull();
    });
  });

  describe('createOne method', () => {
    it('should be defined', () => {
      expect(controller.createOne).toBeDefined();
    });

    it("should call the resourceService's createOne method", async () => {
      const request = resourceCreateMocks[0];
      const requestDTO = resourceCreateDTOMocks[0];
      const result = resourceDetailedMocks[0];

      serviceMock.createOne.mockResolvedValueOnce(result);

      await controller.createOne(requestDTO);

      expect(serviceMock.createOne).toHaveBeenCalled();
      expect(serviceMock.createOne.mock.calls[0][0]).toEqual(request);
    });

    it('should return a ResourceDetailedDTO', async () => {
      const requestDTO = resourceCreateDTOMocks[0];
      const result = resourceDetailedMocks[0];
      const resultDTO = resourceDetailedDTOMocks[0];

      serviceMock.createOne.mockResolvedValueOnce(result);

      expect(await controller.createOne(requestDTO)).toEqual(resultDTO);
    });

    it('should return null if resource not found', async () => {
      serviceMock.createOne.mockResolvedValueOnce(null);

      expect(await controller.createOne(resourceCreateDTOMocks[0])).toBeNull();
    });
  });

  describe('updateOne method', () => {
    it('should be defined', () => {
      expect(controller.updateOne).toBeDefined();
    });

    it("should call the resourceService's updateOne method", async () => {
      const request = resourceMocks[0];
      const requestDTO = resourceDTOMocks[0];

      serviceMock.updateOne.mockResolvedValueOnce(request);

      await controller.updateOne(requestDTO);

      expect(serviceMock.updateOne).toHaveBeenCalled();
      expect(serviceMock.updateOne.mock.calls[0][0]).toEqual(request);
    });

    it('should return a ResourceDTO', async () => {
      const requestDTO = resourceDTOMocks[0];

      const result = resourceMocks[0];
      const resultDTO = resourceDTOMocks[0];

      serviceMock.updateOne.mockResolvedValueOnce(result);

      expect(await controller.updateOne(requestDTO)).toEqual(resultDTO);
    });

    it('should return null if resource not found', async () => {
      serviceMock.updateOne.mockResolvedValueOnce(null);

      expect(await controller.updateOne(resourceDTOMocks[0])).toBeNull();
    });
  });

  describe('deleteOne method', () => {
    it('should be defined', () => {
      expect(controller.deleteOne).toBeDefined();
    });

    it("should call the resourceService's deleteOne method", async () => {
      const result = resourceMocks[0];

      serviceMock.deleteOne.mockResolvedValueOnce(result);

      await controller.deleteOne(result.id);

      expect(serviceMock.deleteOne).toHaveBeenCalled();
      expect(serviceMock.deleteOne).toHaveBeenCalledWith(result.id);
    });

    it('should return a ResourceDTO', async () => {
      const result = resourceMocks[0];
      const resultDTO = resourceDTOMocks[0];

      serviceMock.deleteOne.mockResolvedValueOnce(result);

      expect(await controller.deleteOne(result.id)).toEqual(resultDTO);
    });

    it('should return null if resource not found', async () => {
      serviceMock.deleteOne.mockResolvedValueOnce(null);

      expect(await controller.deleteOne('1')).toBeNull();
    });
  });
});
