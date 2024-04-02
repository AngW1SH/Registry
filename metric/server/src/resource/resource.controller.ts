import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ResourceService } from './resource.service';
import {
  ResourceCreateDTO,
  ResourceDTO,
  ResourceDetailedDTO,
} from './resource.entity';

@Controller('resource')
export class ResourceController {
  constructor(private resourceService: ResourceService) {}

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<ResourceDetailedDTO | null> {
    const result = await this.resourceService.findOne(id);

    if (!result) return null;

    return {
      ...result,
      params: JSON.parse(result.params),
      metrics: result.metrics.map((metric) => ({
        ...metric,
        params: JSON.parse(metric.params),
        data: [],
      })),
    };
  }

  @Post()
  async createOne(
    @Body('resource') resource: ResourceCreateDTO,
  ): Promise<ResourceDetailedDTO | null> {
    const result = await this.resourceService.createOne(resource);

    if (!result) return null;

    return {
      ...result,
      params: JSON.parse(result.params),
      metrics: result.metrics.map((metric) => ({
        ...metric,
        params: JSON.parse(metric.params),
        data: [],
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

    if (!result) return null;

    return { ...result, params: JSON.parse(result.params) };
  }

  @Delete(':id')
  async deleteOne(@Param('id') id: string): Promise<ResourceDTO> {
    const result = await this.resourceService.deleteOne(id);

    if (!result) return null;

    return { ...result, params: JSON.parse(result.params) };
  }
}
