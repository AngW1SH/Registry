import { DeepMocked, createMock } from '@golevelup/ts-jest';
import { TokenService } from './token.service';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';

describe('TokenService', () => {
  let service: TokenService;
  let jwtService: DeepMocked<JwtService>;
  let userService: DeepMocked<UserService>;

  beforeEach(() => {
    jest.clearAllMocks();

    jwtService = createMock<JwtService>();
    userService = createMock<UserService>();

    service = new TokenService(jwtService, userService);
  });

  describe('generate method', () => {
    it('should be defined', () => {
      expect(service.generate).toBeDefined();
    });

    it('should call jwtService.sign twice (accessToken and refreshToken)', async () => {
      const jwtServiceSignSpy = jest.spyOn(jwtService, 'signAsync');
      const jwtServiceSignSpySync = jest.spyOn(jwtService, 'sign');

      await service.generate({ id: 1 });

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

      const result = await service.generate({ id: 1 });

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
      await expect(service.generate(payload)).rejects.toThrow();
    });
  });

  describe('refresh method', () => {
    it('should be defined', () => {
      expect(service.refresh).toBeDefined();
    });

    it('should call jwtService.verify', async () => {
      await service.refresh('123');

      expect(jwtService.verify).toHaveBeenCalled();
    });

    it('should call userService.findById', async () => {
      await service.refresh('123');

      expect(userService.findById).toHaveBeenCalled();
    });

    it('should call jwtService.sign', async () => {
      jwtService.verify.mockResolvedValueOnce({
        exp: 0,
        iat: 0,
        id: 123,
      } as never); // I have no clue why that 'never' is needed

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

      await service.refresh('123');

      expect(userService.findById).toHaveBeenCalledWith(123);
    });

    it('should return accessToken', async () => {
      jwtService.verify.mockResolvedValueOnce({
        exp: 0,
        iat: 0,
        id: 123,
      } as never); // I have no clue why that 'never' is needed

      jwtService.signAsync.mockResolvedValueOnce('456');

      const result = await service.refresh('123');

      expect(result).toEqual('456');
    });

    it('should throw an error if no payload is provided', async () => {
      const payload: any = undefined;
      await expect(service.refresh(payload)).rejects.toThrow();
    });

    it('should throw an error if user is not found', async () => {
      userService.findById.mockResolvedValueOnce(undefined);

      await expect(service.refresh('123')).rejects.toThrow();
    });
  });
});
