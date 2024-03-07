import { Controller, Get, Param } from '@nestjs/common';
import { ProjectService } from './project.service';
import { ProjectDetailedDTO } from './project.entity';

@Controller('project')
export class ProjectController {
  constructor(private projectService: ProjectService) {}

  @Get()
  async findAll() {
    return this.projectService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<ProjectDetailedDTO> {
    const result = await this.projectService.findOne(id);

    return {
      ...result,
      resources: result.resources.map((resource) => ({
        ...resource,
        params: JSON.parse(resource.params),
      })),
    };
  }
}
