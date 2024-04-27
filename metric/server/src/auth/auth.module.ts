import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AdminModule } from '@/src/admin/admin.module';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './local.strategy';
import { JwtStrategy } from './jwt.strategy';
import { CookieModule } from 'src/cookie/cookie.module';
import { TokenModule } from 'src/token/token.module';
import { ConfigModule } from '@nestjs/config';
import { AuthController } from './auth.controller';

@Module({
  imports: [
    AdminModule,
    PassportModule,
    CookieModule,
    ConfigModule,
    TokenModule,
  ],
  providers: [AuthService, LocalStrategy, JwtStrategy],
  exports: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
