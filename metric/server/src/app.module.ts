import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TaskModule } from './task/task.module';
import { PlatformModule } from './platform/platform.module';
import { PrismaModule } from './prisma/prisma.module';
import { ProjectModule } from './project/project.module';
import { ResourceModule } from './resource/resource.module';
import { MetricModule } from './metric/metric.module';
import { SnapshotModule } from './snapshot/snapshot.module';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { CookieModule } from './cookie/cookie.module';
import { ConfigModule } from '@nestjs/config';
import { TokenModule } from './token/token.module';
import { MetricGatewayModule } from './metric-gateway/metric-gateway.module';

@Module({
  imports: [
    TaskModule,
    PlatformModule,
    PrismaModule,
    ProjectModule,
    ResourceModule,
    MetricModule,
    SnapshotModule,
    AuthModule,
    UserModule,
    CookieModule,
    ConfigModule.forRoot(),
    TokenModule,
    MetricGatewayModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
