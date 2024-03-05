import { Module } from '@nestjs/common';
import { ProjectController } from './project.controller';
import { ProjectService } from './project.service';
import { ResourceModule } from 'src/resource/resource.module';

@Module({
  imports: [ResourceModule],
  controllers: [ProjectController],
  providers: [ProjectService],
})
export class ProjectModule {}
