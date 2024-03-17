import { Module } from '@nestjs/common';
import { ProjectController } from './project.controller';
import { ProjectService } from './project.service';
import { ResourceModule } from 'src/resource/resource.module';
import { SnapshotModule } from 'src/snapshot/snapshot.module';

@Module({
  imports: [ResourceModule, SnapshotModule],
  controllers: [ProjectController],
  providers: [ProjectService],
})
export class ProjectModule {}
