import { Body, Controller, Headers, Post } from '@nestjs/common';
import { Project, ProjectDetailed } from '../project/project.entity';
import { ImportProject } from './import.entity';
import { ImportService } from './import.service';
import { ApiBody, ApiOperation } from '@nestjs/swagger';

@Controller('import')
export class ImportController {
  constructor(private importService: ImportService) {}

  @Post('project')
  @ApiOperation({ summary: 'Import project' })
  @ApiBody({ type: ImportProject })
  async project(
    @Body('data') project: ImportProject,
    @Headers('Authorization') token: string,
  ) {
    const tokenValue = token?.split(' ')[1];
    if (!tokenValue || tokenValue !== process.env.IMPORT_API_TOKEN) {
      throw new Error('Unauthorized');
    }

    const result = await this.importService.project(project);

    return result;
  }
}
