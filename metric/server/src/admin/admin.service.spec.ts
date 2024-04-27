import { createMock } from '@golevelup/ts-jest';
import { PrismaService } from '../prisma/prisma.service';
import { AdminService } from './admin.service';
import { adminMocks } from './admin.mock';

describe('AdminService', () => {
  let service: AdminService;
  let prisma: PrismaService;

  beforeEach(async () => {
    jest.clearAllMocks();

    prisma = createMock<PrismaService>({
      admin: {
        findMany: jest.fn().mockResolvedValue([]),
        findFirst: jest.fn().mockResolvedValue(null),
      },
    });
    service = new AdminService(prisma);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findByName method', () => {
    it('should be defined', () => {
      expect(service.findByName).toBeDefined();
    });

    it('should call prisma.user.findFirst', async () => {
      await service.findByName('test');

      expect(prisma.admin.findFirst).toHaveBeenCalled();
      expect(prisma.admin.findFirst).toHaveBeenCalledWith(
        expect.objectContaining({
          where: expect.objectContaining({
            name: 'test',
          }),
        }),
      );
    });

    it('should return null if no user is found', async () => {
      jest.spyOn(prisma.admin, 'findFirst').mockResolvedValueOnce(null as any);

      const result = await service.findByName('test');

      expect(result).toBeNull();
    });

    it('should return the user if found', async () => {
      const userPrisma = adminMocks[0];

      jest.spyOn(prisma.admin, 'findFirst').mockResolvedValueOnce(userPrisma);

      const result = await service.findByName(userPrisma.id);

      expect(result).toEqual(userPrisma);
    });
  });

  describe('findById method', () => {
    it('should be defined', () => {
      expect(service.findById).toBeDefined();
    });

    it('should call prisma.user.findFirst', async () => {
      await service.findById('test');

      expect(prisma.admin.findFirst).toHaveBeenCalled();
    });

    it('should return null if no user is found', async () => {
      jest.spyOn(prisma.admin, 'findFirst').mockResolvedValueOnce(null as any);

      const result = await service.findById('test');
      expect(result).toBeNull();
    });

    it('should return the user if found', async () => {
      const userPrisma = adminMocks[0];

      jest.spyOn(prisma.admin, 'findFirst').mockResolvedValueOnce(userPrisma);

      const result = await service.findById(userPrisma.id);

      expect(result).toEqual(userPrisma);
    });
  });
});
