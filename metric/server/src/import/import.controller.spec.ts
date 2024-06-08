import { DeepMocked, createMock } from '@golevelup/ts-jest';
import { ImportController } from './import.controller';
import { ImportService } from './import.service';
import { importProjectMock } from './import.mock';

describe('ImportController', () => {
  let controller: ImportController;
  let serviceMock: DeepMocked<ImportService>;

  beforeEach(() => {
    serviceMock = createMock<ImportService>();
    controller = new ImportController(serviceMock);

    process.env = {
      IMPORT_API_TOKEN: 'test-token',
    };
  });

  describe('project method', () => {
    it("should call the importService's project method with the given data", async () => {
      const data = importProjectMock;

      const token = 'bearer: test-token';

      await controller.project(data, token);

      expect(serviceMock.project).toHaveBeenCalled();
      expect(serviceMock.project).toHaveBeenCalledWith(data);
    });

    it('should throw an error if the token is invalid', async () => {
      const data = importProjectMock;

      const token = 'bearer: invalid-token';

      await expect(controller.project(data, token)).rejects.toThrow();
    });

    it("should return the result of the importService's project method", async () => {
      const data = importProjectMock;
      jest
        .spyOn(serviceMock, 'project')
        .mockResolvedValueOnce('test-data' as any);

      const token = 'bearer: test-token';

      const result = await controller.project(data, token);

      expect(result).toEqual('test-data');
    });
  });
});
