import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request, Response } from 'express';
import { CookieService } from 'src/cookie/cookie.service';
import { TokenService } from 'src/token/token.service';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private tokenService: TokenService,
    private cookieService: CookieService,
  ) {}

  async validateUser(name: string, pass: string): Promise<any> {
    const user = await this.userService.findOne(name);

    if (user && user.password === pass) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async refresh(req: Request, res: Response) {
    const refreshToken = this.cookieService.get(req, 'metric_refresh_token');
    if (!refreshToken) {
      throw new UnauthorizedException('No refresh token provided');
    }

    const accessToken = await this.tokenService.refresh(refreshToken);

    if (accessToken) {
      this.cookieService.set(res, 'metric_access_token', accessToken);
      return true;
    }

    return false;
  }

  async login(res: Response, user: any) {
    const { password: _, ...payload } = user;
    const { accessToken, refreshToken } =
      await this.tokenService.generate(payload);

    this.cookieService.set(res, 'metric_access_token', accessToken);

    this.cookieService.set(res, 'metric_refresh_token', refreshToken);
  }
}
