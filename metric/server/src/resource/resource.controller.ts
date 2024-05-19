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
import { ResourceService } from './resource.service';
import {
  ResourceCreateDTO,
  ResourceDTO,
  ResourceDetailedDTO,
} from './resource.entity';
import { MetricDetailedDTO } from '../metric/metric.entity';
import {
  ApiBody,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
} from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('resource')
@UseGuards(JwtAuthGuard)
export class ResourceController {
  constructor(private resourceService: ResourceService) {}

  @Get(':id')
  @ApiOperation({
    summary:
      'Get detailed resource data by id. Does NOT gather metric data from the core server',
  })
  @ApiOkResponse({ type: ResourceDetailedDTO })
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
  @ApiOperation({
    summary: 'Create a new resource',
    description:
      'Params are filled with default values defined in the config for the provided platform. Metrics array should normally be empty',
  })
  @ApiBody({ type: ResourceCreateDTO })
  @ApiOkResponse({ type: ResourceDetailedDTO })
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
  @ApiOperation({
    summary: 'Update existing resource',
    description:
      "Only updates the immediate props (name, params) and shouldn't be used to update nested entities",
  })
  @ApiBody({ type: ResourceDTO })
  @ApiOkResponse({ type: ResourceDTO })
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
  @ApiOperation({
    summary: 'Delete resource by id',
  })
  @ApiParam({ name: 'id', type: String })
  @ApiOkResponse({ type: ResourceDTO })
  async deleteOne(@Param('id') id: string): Promise<ResourceDTO> {
    const result = await this.resourceService.deleteOne(id);

    if (!result) return null;

    return { ...result, params: JSON.parse(result.params) };
  }

  @Get(':id/start')
  @ApiOperation({
    summary: 'Start tracking all resource metrics by resource id',
    description:
      'Starts all of the stopped metrics of the resource. Does not create metrics that have not been explicitly added',
  })
  @ApiParam({ name: 'id', type: String })
  @ApiOkResponse()
  async startTracking(@Param('id') id: string) {
    const result = await this.resourceService.startTracking(id);

    return result;
  }

  @Get(':id/stop')
  @ApiOperation({
    summary: 'Stop tracking all resource metrics by resource id',
    description:
      'Stops all of the running metrics of the resource. Does not delete any of the metrics',
  })
  async stopTracking(@Param('id') id: string) {
    const result = await this.resourceService.stopTracking(id);

    return result;
  }
}
