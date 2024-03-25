import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request, Response } from 'express';
import { CookieService } from 'src/cookie/cookie.service';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
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

  async login(res: Response, user: any) {
    const { password: _, ...payload } = user;
    return this.cookieService.set(
      res,
      'metric_access_token',
      this.jwtService.sign(payload),
    );
  }
}
