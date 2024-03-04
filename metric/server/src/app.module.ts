import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TaskModule } from './task/task.module';
import { PlatformModule } from './platform/platform.module';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [TaskModule, PlatformModule, PrismaModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
