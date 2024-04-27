import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { Request } from 'express';
import { CookieService } from 'src/cookie/cookie.service';
import { ConfigService } from '@nestjs/config';
import { Admin } from '@/src/admin/admin.entity';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private cookieService: CookieService,
    private configService: ConfigService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        JwtStrategy.extractJWT(cookieService),
        ExtractJwt.fromAuthHeaderAsBearerToken(),
      ]),
      ignoreExpiration: false,
      secretOrKey: configService.get('JWT_SECRET'),
    });
  }

  async validate(payload: any): Promise<Admin> {
    return payload;
  }

  private static extractJWT(
    cookieService: CookieService,
  ): (req: Request) => string | null {
    return function (req: Request) {
      const value = cookieService.get(req, 'metric_access_token');

      if (req.cookies && value && value.length > 0) {
        return value;
      }
      return null;
    };
  }
}
