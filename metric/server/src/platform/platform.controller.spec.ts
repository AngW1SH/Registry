import { Test, TestingModule } from '@nestjs/testing';
import { PlatformController } from './platform.controller';
import { PlatformService } from './platform.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { platformMocks } from './platform.mock';

describe('PlatformController', () => {
  let controller: PlatformController;
  let service: PlatformService;
  let prisma: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PlatformController],
      providers: [PlatformService, PrismaService],
    }).compile();

    controller = module.get<PlatformController>(PlatformController);
    service = module.get<PlatformService>(PlatformService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  describe('findAll method', () => {
    it('should call the platformService.findAll method', async () => {
      const result = platformMocks;

      jest.spyOn(service, 'findAll').mockImplementation(async () => result);

      await controller.findAll();

      expect(service.findAll).toHaveBeenCalled();
    });
    it('should return the found platforms', async () => {
      const result = platformMocks;

      jest.spyOn(service, 'findAll').mockImplementation(async () => result);

      expect(await controller.findAll()).toEqual(result);
    });
  });

  describe('findOne method', () => {
    it('should call the platformService.findOne method', async () => {
      const result = platformMocks[0];

      jest.spyOn(service, 'findOne').mockImplementation(async () => result);

      await controller.findOne(result.name);

      expect(service.findOne).toHaveBeenCalled();
      expect(service.findOne).toHaveBeenCalledWith(result.name);
    });
    it('should return the found platform', async () => {
      const result = platformMocks[0];

      jest.spyOn(service, 'findOne').mockImplementation(async () => result);

      expect(await controller.findOne(result.name)).toEqual(result);
    });
    it("should return null if the platform doesn't exist", async () => {
      jest.spyOn(service, 'findOne').mockImplementation(async () => null);

      expect(await controller.findOne('0')).toBeNull();
    });
  });
});
