import { Module } from '@nestjs/common';
import { ImportService } from './import.service';
import { ImportController } from './import.controller';
import { PrismaModule } from '../prisma/prisma.module';
import { ProjectModule } from '../project/project.module';

@Module({
  imports: [PrismaModule, ProjectModule],
  providers: [ImportService],
  controllers: [ImportController],
})
export class ImportModule {}
