import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AdminService } from '@/src/admin/admin.service';
import { RedisService } from '../redis/redis.service';

@Injectable()
export class TokenService {
  constructor(
    private jwtService: JwtService,
    private adminService: AdminService,
    private redisService: RedisService,
  ) {}

  async generate(payload: any) {
    if (!payload) throw new UnauthorizedException('No userId specified');

    const accessToken = await this.jwtService.signAsync(payload, {
      expiresIn: '1h',
    });
    const refreshToken = await this.jwtService.signAsync(payload, {
      expiresIn: '180d',
    });

    await this.redisService.set('token-' + payload.id, refreshToken);

    return {
      accessToken,
      refreshToken,
    };
  }

  async refresh(refreshToken: string) {
    if (!refreshToken)
      throw new UnauthorizedException('No refresh token provided');
    const { exp, iat, ...user } = await this.jwtService.verify(refreshToken);

    const tokenFromDB = await this.redisService.get('token-' + user.id);

    if (!tokenFromDB || tokenFromDB !== refreshToken) {
      throw new UnauthorizedException('Invalid refresh token');
    }

    const doesAdminExist = await this.adminService.findById(user.id);

    if (!doesAdminExist)
      throw new UnauthorizedException('Admin not found in the database');

    const newAccessToken = await this.jwtService.signAsync(user, {
      expiresIn: '1h',
    });

    return newAccessToken;
  }
}
