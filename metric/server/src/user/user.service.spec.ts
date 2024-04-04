import { createMock } from '@golevelup/ts-jest';
import { PrismaService } from '../prisma/prisma.service';
import { UserService } from './user.service';
import { userMocks } from './user.mock';

describe('UserService', () => {
  let service: UserService;
  let prisma: PrismaService;

  beforeEach(async () => {
    jest.clearAllMocks();

    prisma = createMock<PrismaService>({
      user: {
        findMany: jest.fn().mockResolvedValue([]),
        findFirst: jest.fn().mockResolvedValue(null),
      },
    });
    service = new UserService(prisma);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findOne method', () => {
    it('should be defined', () => {
      expect(service.findOne).toBeDefined();
    });

    it('should call prisma.user.findFirst', async () => {
      await service.findOne('test');

      expect(prisma.user.findFirst).toHaveBeenCalled();
      expect(prisma.user.findFirst).toHaveBeenCalledWith(
        expect.objectContaining({
          where: expect.objectContaining({
            name: 'test',
          }),
        }),
      );
    });

    it('should return null if no user is found', async () => {
      jest.spyOn(prisma.user, 'findFirst').mockResolvedValueOnce(null as any);

      const result = await service.findOne('test');

      expect(result).toBeNull();
    });

    it('should return the user if found', async () => {
      const userPrisma = userMocks[0];

      jest.spyOn(prisma.user, 'findFirst').mockResolvedValueOnce(userPrisma);

      const result = await service.findOne(userPrisma.id);

      expect(result).toEqual(userPrisma);
    });
  });

  describe('findById method', () => {
    it('should be defined', () => {
      expect(service.findById).toBeDefined();
    });

    it('should call prisma.user.findFirst', async () => {
      await service.findById('test');

      expect(prisma.user.findFirst).toHaveBeenCalled();
    });

    it('should return null if no user is found', async () => {
      jest.spyOn(prisma.user, 'findFirst').mockResolvedValueOnce(null as any);

      const result = await service.findById('test');
      expect(result).toBeNull();
    });

    it('should return the user if found', async () => {
      const userPrisma = userMocks[0];

      jest.spyOn(prisma.user, 'findFirst').mockResolvedValueOnce(userPrisma);

      const result = await service.findById(userPrisma.id);

      expect(result).toEqual(userPrisma);
    });
  });
});
