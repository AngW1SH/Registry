import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ProjectService } from './project.service';
import {
  ProjectCreateDTO,
  ProjectDTO,
  ProjectDetailedDTO,
} from './project.entity';

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
        metrics: resource.metrics.map((metric) => ({
          ...metric,
          params: JSON.parse(metric.params),
        })),
      })),
    };
  }

  @Post()
  async create(
    @Body('project') project: ProjectCreateDTO,
  ): Promise<ProjectDetailedDTO> {
    const result = await this.projectService.create(project);

    return {
      ...result,
      resources: result.resources.map((resource) => ({
        ...resource,
        params: JSON.parse(resource.params),
        metrics: resource.metrics.map((metric) => ({
          ...metric,
          params: JSON.parse(metric.params),
          data: [],
        })),
      })),
    };
  }

  @Put(':id')
  async update(@Body('project') project: ProjectDTO): Promise<ProjectDTO> {
    const result = await this.projectService.updateOne(project);

    return result;
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    const result = await this.projectService.deleteOne(id);

    return result;
  }
}
