import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';

@Injectable()
export class TokenService {
  constructor(
    private jwtService: JwtService,
    private userService: UserService,
  ) {}

  async generate(payload: any) {
    if (!payload) throw new UnauthorizedException('No userId specified');

    const accessToken = await this.jwtService.signAsync(payload, {
      expiresIn: '1h',
    });
    const refreshToken = await this.jwtService.signAsync(payload, {
      expiresIn: '10d',
    });

    return {
      accessToken,
      refreshToken,
    };
  }

  async refresh(refreshToken: string) {
    if (!refreshToken)
      throw new UnauthorizedException('No refresh token provided');
    const { exp, iat, ...user } = await this.jwtService.verify(refreshToken);

    const doesUserExist = await this.userService.findById(user.id);

    if (!doesUserExist)
      throw new UnauthorizedException('User not found in the database');

    const newAccessToken = await this.jwtService.signAsync(user, {
      expiresIn: '1h',
    });

    return newAccessToken;
  }
}
