import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { ProjectService } from './project.service';
import {
  ProjectCreateDTO,
  ProjectCreateRequestBody,
  ProjectDTO,
  ProjectDetailedDTO,
  ProjectInList,
  ProjectUpdateRequestBody,
} from './project.entity';
import {
  ApiBody,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiProperty,
  ApiResponse,
} from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('project')
@UseGuards(JwtAuthGuard)
export class ProjectController {
  constructor(private projectService: ProjectService) {}

  @Get()
  @ApiOperation({ summary: 'Get all projects with platform names' })
  @ApiResponse({ status: 200, type: ProjectInList, isArray: true })
  async findAll(): Promise<ProjectInList[]> {
    return this.projectService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get detailed project data by ID' })
  @ApiOkResponse({ status: 200, type: ProjectDetailedDTO })
  @ApiNotFoundResponse({
    status: 404,
    type: null,
  })
  async findOne(@Param('id') id: string): Promise<ProjectDetailedDTO> | null {
    const result = await this.projectService.findOne(id);

    if (!result) {
      return null;
    }

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
  @ApiOperation({ summary: 'Create new project' })
  @ApiBody({ type: ProjectCreateRequestBody })
  @ApiOkResponse({ status: 200, type: ProjectDetailedDTO })
  async create(
    @Body('project') project: ProjectCreateDTO,
  ): Promise<ProjectDetailedDTO | null> {
    const result = await this.projectService.create(project);

    if (!result) {
      return null;
    }

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
  @ApiOperation({
    summary:
      'Update project data. Only updates the immediate data (name, description). Also updates groups of running tasks on the core server to match the new data',
  })
  @ApiParam({ name: 'id', type: String })
  @ApiBody({ type: ProjectUpdateRequestBody })
  @ApiOkResponse({ status: 200, type: ProjectDTO })
  async update(
    @Body('project') project: ProjectDTO,
  ): Promise<ProjectDTO | null> {
    const result = await this.projectService.updateOne(project);

    return result;
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete project by ID' })
  @ApiParam({ name: 'id', type: String })
  @ApiOkResponse({ status: 200, type: ProjectDTO })
  async delete(@Param('id') id: string): Promise<ProjectDTO | null> {
    const result = await this.projectService.deleteOne(id);

    return result;
  }
}
