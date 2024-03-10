import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { ResourceService } from './resource.service';
import {
  ResourceCreateDTO,
  ResourceDTO,
  ResourceDetailedDTO,
} from './resource.entity';

@Controller('resource')
export class ResourceController {
  constructor(private resourceService: ResourceService) {}

  @Get()
  async findAll(): Promise<ResourceDTO[]> {
    const result = await this.resourceService.findAll();

    return result.map((resource) => ({
      ...resource,
      params: JSON.parse(resource.params),
    }));
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<ResourceDetailedDTO | null> {
    const result = await this.resourceService.findOne(id);

    return {
      ...result,
      params: JSON.parse(result.params),
      metrics: result.metrics.map((metric) => ({
        ...metric,
        params: JSON.parse(metric.params),
      })),
    };
  }

  @Post()
  async createOne(
    @Body('resource') resource: ResourceDTO,
  ): Promise<ResourceDetailedDTO> {
    const result = await this.resourceService.createOne(resource);

    return {
      ...result,
      params: JSON.parse(result.params),
      metrics: result.metrics.map((metric) => ({
        ...metric,
        params: JSON.parse(metric.params),
      })),
    };
  }

  @Put(':id')
  async updateOne(
    @Body('resource') resource: ResourceDTO,
  ): Promise<ResourceDTO> {
    const result = await this.resourceService.updateOne({
      ...resource,
      params: JSON.stringify(resource.params),
    });

    return { ...result, params: JSON.parse(result.params) };
  }
}
