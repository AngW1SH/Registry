import { Body, Controller, Post } from '@nestjs/common';
import { Project, ProjectDetailed } from '../project/project.entity';
import { ImportProject } from './import.entity';
import { ImportService } from './import.service';

@Controller('import')
export class ImportController {
  constructor(private importService: ImportService) {}

  @Post('project')
  async project(@Body('data') project: ImportProject) {
    const result = await this.importService.project(project);

    return result;
  }
}
