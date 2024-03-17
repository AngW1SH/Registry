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

@Module({
  imports: [TaskModule, PlatformModule, PrismaModule, ProjectModule, ResourceModule, MetricModule, SnapshotModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
