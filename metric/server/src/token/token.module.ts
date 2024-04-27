import { Module } from '@nestjs/common';
import { TokenService } from './token.service';
import { AdminModule } from '@/src/admin/admin.module';
import { PassportModule } from '@nestjs/passport';
import { CookieModule } from 'src/cookie/cookie.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    AdminModule,
    PassportModule,
    CookieModule,
    ConfigModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get('JWT_SECRET'),
        signOptions: { expiresIn: '1d' },
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [TokenService],
  exports: [TokenService],
})
export class TokenModule {}
