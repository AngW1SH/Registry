import { Module } from '@nestjs/common';
import { ImportService } from './import.service';
import { ImportController } from './import.controller';
import { PrismaModule } from '../prisma/prisma.module';
import { ProjectModule } from '../project/project.module';
import { ResourceModule } from '../resource/resource.module';

@Module({
  imports: [PrismaModule, ProjectModule, ResourceModule],
  providers: [ImportService],
  controllers: [ImportController],
})
export class ImportModule {}
