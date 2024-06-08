import { DeepMocked, createMock } from '@golevelup/ts-jest';
import { TokenService } from './token.service';
import { JwtService } from '@nestjs/jwt';
import { AdminService } from '../admin/admin.service';
import { RedisService } from '../redis/redis.service';

describe('TokenService', () => {
  let service: TokenService;
  let jwtService: DeepMocked<JwtService>;
  let adminService: DeepMocked<AdminService>;
  let redisService: DeepMocked<RedisService>;

  beforeEach(() => {
    jest.clearAllMocks();

    jwtService = createMock<JwtService>();
    adminService = createMock<AdminService>();
    redisService = createMock<RedisService>();

    service = new TokenService(jwtService, adminService, redisService);
  });

  describe('generate method', () => {
    it('should call jwtService.sign twice (accessToken and refreshToken)', async () => {
      const jwtServiceSignSpy = jest.spyOn(jwtService, 'signAsync');
      const jwtServiceSignSpySync = jest.spyOn(jwtService, 'sign');

      await service.generate({ id: 1 }, true);

      try {
        expect(jwtServiceSignSpySync).toHaveBeenCalledTimes(2);
      } catch (error) {
        expect(jwtServiceSignSpy).toHaveBeenCalledTimes(2);
      }
    });

    it('should return accessToken and refreshToken', async () => {
      jwtService.signAsync.mockResolvedValueOnce('123');
      jwtService.signAsync.mockResolvedValueOnce('456');

      jwtService.sign.mockReturnValueOnce('123');
      jwtService.sign.mockReturnValueOnce('456');

      const result = await service.generate({ id: 1 }, true);

      expect(result).toHaveProperty('accessToken');
      expect(result).toHaveProperty('refreshToken');

      try {
        expect(result.accessToken).toEqual('123');
        expect(result.refreshToken).toEqual('456');
      } catch {
        expect(result.accessToken).toEqual('456');
        expect(result.refreshToken).toEqual('123');
      }
    });

    it('should throw an error if no payload is provided', async () => {
      const payload: any = undefined;
      await expect(service.generate(payload, true)).rejects.toThrow();
    });
  });

  describe('refresh method', () => {
    it('should call jwtService.verify', async () => {
      redisService.get.mockResolvedValueOnce('123');
      await service.refresh('123');

      expect(jwtService.verify).toHaveBeenCalled();
    });

    it('should call userService.findById', async () => {
      redisService.get.mockResolvedValueOnce('123');
      await service.refresh('123');

      expect(adminService.findById).toHaveBeenCalled();
    });

    it('should call jwtService.sign', async () => {
      jwtService.verify.mockResolvedValueOnce({
        exp: 0,
        iat: 0,
        id: 123,
      } as never); // I have no clue why that 'never' is needed
      redisService.get.mockResolvedValueOnce('123');

      await service.refresh('123');

      try {
        expect(jwtService.signAsync).toHaveBeenCalled();
      } catch {
        expect(jwtService.sign).toHaveBeenCalled();
      }
    });

    it("should call userService.findById with the payload's data", async () => {
      jwtService.verify.mockResolvedValueOnce({
        exp: 0,
        iat: 0,
        id: 123,
      } as never); // I have no clue why that 'never' is needed
      redisService.get.mockResolvedValueOnce('123');

      await service.refresh('123');

      expect(adminService.findById).toHaveBeenCalledWith(123);
    });

    it('should return accessToken', async () => {
      jwtService.verify.mockResolvedValueOnce({
        exp: 0,
        iat: 0,
        id: 123,
      } as never); // I have no clue why that 'never' is needed

      jwtService.signAsync.mockResolvedValueOnce('456');
      redisService.get.mockResolvedValueOnce('123');

      const result = await service.refresh('123');

      expect(result).toEqual('456');
    });

    it('should throw an error if no payload is provided', async () => {
      const payload: any = undefined;
      await expect(service.refresh(payload)).rejects.toThrow();
    });

    it('should throw an error if user is not found', async () => {
      adminService.findById.mockResolvedValueOnce(undefined);
      redisService.get.mockResolvedValueOnce('123');

      await expect(service.refresh('123')).rejects.toThrow();
    });
  });
});
