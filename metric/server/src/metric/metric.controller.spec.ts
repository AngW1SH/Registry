import { DeepMocked, createMock } from '@golevelup/ts-jest';
import { MetricController } from './metric.controller';
import { MetricService } from './metric.service';
import {
  AbstractMetricDetailedMocks,
  metricCreateMocks,
  metricDTOMocks,
  metricDetailedDTOMocks,
  metricDetailedMocks,
  metricMocks,
} from './metric.mock';

describe('MetricController', () => {
  let controller: MetricController;
  let serviceMock: DeepMocked<MetricService>;

  beforeEach(() => {
    serviceMock = createMock<MetricService>();
    controller = new MetricController(serviceMock);
  });

  describe('update method', () => {
    it("should call the metricService's updateParams method", async () => {
      const result = metricMocks[0];

      const request = metricMocks[0];
      const requestDTO = metricDTOMocks[0];

      serviceMock.updateParams.mockResolvedValueOnce(result);

      await controller.update(result.id, requestDTO);

      expect(serviceMock.updateParams).toHaveBeenCalled();
      expect(serviceMock.updateParams).toHaveBeenCalledWith(request);
    });

    it('should return a MetricDTO', async () => {
      const result = metricMocks[0];
      const resultDTO = metricDTOMocks[0];

      serviceMock.updateParams.mockResolvedValueOnce(result);

      expect(await controller.update(result.id, resultDTO)).toEqual(resultDTO);
    });

    it('should return null if metric not found', async () => {
      const requestDTO = metricDTOMocks[0];

      serviceMock.updateParams.mockResolvedValueOnce(null);

      expect(await controller.update(requestDTO.id, requestDTO)).toBeNull();
    });
  });

  describe('create method', () => {
    it("should call the metricService's create method", async () => {
      const request = metricCreateMocks[0];

      serviceMock.create.mockResolvedValueOnce(metricDetailedMocks);

      await controller.create({
        ...request,
        params: JSON.parse(request.params),
      });

      expect(serviceMock.create).toHaveBeenCalled();
      expect(serviceMock.create).toHaveBeenCalledWith(request);
    });

    it('should return a MetricWithSnapshotsDTO with all its newly created dependencies', async () => {
      const request = metricCreateMocks[0];

      serviceMock.create.mockResolvedValueOnce(metricDetailedMocks);

      const result = await controller.create({ ...request, params: [] });

      expect(result).toEqual(metricDetailedDTOMocks);
    });
  });

  describe('start method', () => {
    it("should call the metricService's start method", async () => {
      const requestDTO = { ...metricDTOMocks[0] };
      const request = metricMocks[0];

      serviceMock.start.mockResolvedValueOnce(null);

      await controller.start(requestDTO);

      expect(serviceMock.start).toHaveBeenCalled();
      expect(serviceMock.start).toHaveBeenCalledWith(request);
    });
  });

  describe('stop method', () => {
    it("should call the metricService's stop method", async () => {
      const id = 'test';

      serviceMock.stop.mockResolvedValueOnce(null);

      await controller.stop(id);

      expect(serviceMock.stop).toHaveBeenCalled();
      expect(serviceMock.stop).toHaveBeenCalledWith(id, false);
    });
  });

  describe('listAll method', () => {
    it("should call the metricService's listAll method", async () => {
      serviceMock.listAll.mockResolvedValueOnce([]);

      await controller.listAll();

      expect(serviceMock.listAll).toHaveBeenCalled();
    });

    it('should return an array of AbstractMetricDetailed', async () => {
      serviceMock.listAll.mockResolvedValueOnce(AbstractMetricDetailedMocks);

      const result = await controller.listAll();

      expect(result).toEqual(AbstractMetricDetailedMocks);
    });
  });

  describe('delete method', () => {
    it("should call the metricService's deleteOne method", async () => {
      const id = 'test';
      const result = metricMocks[0];

      serviceMock.deleteOne.mockResolvedValueOnce(result);

      await controller.delete(id);

      expect(serviceMock.deleteOne).toHaveBeenCalled();
      expect(serviceMock.deleteOne).toHaveBeenCalledWith(id);
    });

    it('should return a MetricDTO', async () => {
      const result = metricMocks[0];
      const resultDTO = metricDTOMocks[0];

      serviceMock.deleteOne.mockResolvedValueOnce(result);

      expect(await controller.delete(result.id)).toEqual(resultDTO);
    });

    it('should return null if metric not found', async () => {
      serviceMock.deleteOne.mockResolvedValueOnce(null);

      expect(await controller.delete('test')).toBeNull();
    });
  });

  describe('execute method', () => {
    it("should call the metricService's execute method", async () => {
      const requestDTO = metricDTOMocks[0];
      const request = metricMocks[0];

      serviceMock.execute.mockResolvedValueOnce(null);

      await controller.execute(requestDTO);

      expect(serviceMock.execute).toHaveBeenCalled();
      expect(serviceMock.execute).toHaveBeenCalledWith(request);
    });
  });
});
