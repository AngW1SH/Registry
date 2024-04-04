import { createMock } from '@golevelup/ts-jest';
import { PrismaService } from '../prisma/prisma.service';
import { platformMocks } from './platform.mock';
import { PlatformService } from './platform.service';

describe('PlatformService', () => {
  let service: PlatformService;
  let prisma: PrismaService;

  beforeEach(async () => {
    prisma = createMock<PrismaService>({
      platform: {
        findMany: jest.fn().mockResolvedValue(platformMocks),
        findFirst: jest.fn().mockResolvedValue(platformMocks[0]),
      },
    });
    service = new PlatformService(prisma);
  });

  describe('findAll method', () => {
    it('should be defined', () => {
      expect(service).toBeDefined();
    });

    it('should return an array of platforms', async () => {
      const result = platformMocks;

      jest.spyOn(prisma.platform, 'findMany').mockResolvedValueOnce(result);

      expect(await service.findAll()).toEqual(result);
    });

    it("should return an empty array if there's no platforms", async () => {
      const result = [];

      jest.spyOn(prisma.platform, 'findMany').mockResolvedValueOnce(result);

      expect(await service.findAll()).toEqual(result);
    });
  });

  describe('findOne method', () => {
    it('should be defined', () => {
      expect(service).toBeDefined();
    });

    it('should return a platform', async () => {
      const result = platformMocks[0];

      jest.spyOn(prisma.platform, 'findFirst').mockResolvedValueOnce(result);

      expect(await service.findOne(result.id)).toEqual(result);
    });

    it("should return null if there's no platform", async () => {
      jest.spyOn(prisma.platform, 'findFirst').mockResolvedValueOnce(null);

      expect(await service.findOne(platformMocks[0].id)).toBeNull();
    });
  });
});
