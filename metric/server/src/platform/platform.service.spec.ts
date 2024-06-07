import { createMock } from '@golevelup/ts-jest';
import { PrismaService } from '../prisma/prisma.service';
import { platformMocks } from './platform.mock';
import { PlatformService } from './platform.service';

describe('PlatformService', () => {
  let service: PlatformService;

  beforeEach(async () => {
    service = new PlatformService();
  });

  describe('findAll method', () => {
    it('should be defined', () => {
      expect(service).toBeDefined();
    });

    it('should return an array of platforms', async () => {
      const result = platformMocks;

      expect(await service.findAll()).toEqual(expect.arrayContaining(result));
    });
  });

  describe('findOne method', () => {
    it('should be defined', () => {
      expect(service).toBeDefined();
    });

    it('should return a platform', async () => {
      const result = platformMocks[0];

      expect(await service.findOne(result.name)).toEqual(result);
    });

    it("should return null if there's no platform", async () => {
      expect(await service.findOne('invalid')).toBeNull();
    });
  });
});
