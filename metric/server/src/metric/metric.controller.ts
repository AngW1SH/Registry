import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import {
  AbstractMetricDTO,
  AbstractMetricDetailed,
  AbstractMetricDetailedDTO,
  MetricCreate,
  MetricCreateDTO,
  MetricCreateRequestBody,
  MetricDTO,
  MetricDetailedDTO,
  MetricUpdateRequestBody,
} from './metric.entity';
import { MetricService } from './metric.service';
import {
  ApiBody,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
} from '@nestjs/swagger';

@Controller('metric')
export class MetricController {
  constructor(private metricService: MetricService) {}

  @Put(':id')
  @ApiOperation({
    summary: 'Update metric params by id',
    description: 'Does not update metric name and resource id, just the params',
  })
  @ApiParam({ name: 'id' })
  @ApiBody({ type: MetricUpdateRequestBody })
  @ApiOkResponse({ type: MetricDTO })
  async update(
    @Param('id') id: string,
    @Body('metric') metric: MetricDTO,
  ): Promise<MetricDTO> {
    const result = await this.metricService.updateParams({
      ...metric,
      params: JSON.stringify(metric.params),
    });

    if (!result) return null;

    return {
      ...result,
      params: JSON.parse(result.params),
    };
  }

  @Post()
  @ApiOperation({
    summary: 'Create a new metric',
    description:
      'The "params" property from the request is ignored. Instead, the default config values are used. If the metric has dependencies, creates those too. Returns an array of all of the created metrcs.',
  })
  @ApiBody({ type: MetricCreateRequestBody })
  @ApiOkResponse({ type: MetricDetailedDTO, isArray: true })
  async create(@Body() metric: MetricCreateDTO): Promise<MetricDetailedDTO[]> {
    const result = await this.metricService.create({
      ...metric,
      params: JSON.stringify(metric.params),
    });

    return result.map((metric) => ({
      ...metric,
      params: JSON.parse(metric.params),
    }));
  }

  @Post(':id/start')
  @ApiOperation({
    summary: 'Start a metric by id',
  })
  @ApiParam({ name: 'id', type: String })
  @ApiBody({ type: MetricUpdateRequestBody })
  @ApiOkResponse()
  async start(@Body('metric') metric: MetricDTO) {
    const result = await this.metricService.start({
      ...metric,
      params: JSON.stringify(metric.params),
    });

    return result;
  }

  @Post(':id/stop')
  @ApiOperation({
    summary: 'Start a metric by id',
  })
  @ApiParam({ name: 'id', type: String })
  @ApiOkResponse()
  async stop(@Param('id') id: string) {
    const result = await this.metricService.stop(id, false);

    return result;
  }

  @Get()
  @ApiOperation({
    summary: "List all of the available metrics' detailed data",
  })
  @ApiOkResponse({ type: AbstractMetricDetailedDTO, isArray: true })
  async listAll(): Promise<AbstractMetricDetailed[]> {
    const result = await this.metricService.listAll();

    return result;
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Delete metric by id',
  })
  @ApiParam({ name: 'id', type: String })
  @ApiOkResponse({ type: MetricDTO })
  async delete(@Param('id') id: string): Promise<MetricDTO> {
    const result = await this.metricService.deleteOne(id);

    if (!result) return null;

    return { ...result, params: JSON.parse(result.params) };
  }

  @Post(':id/execute')
  @ApiOperation({
    summary: 'Immediately execute a metric by id',
    description: 'Also starts the metric if it is stopped',
  })
  @ApiParam({ name: 'id', type: String })
  @ApiOkResponse()
  async execute(@Body('metric') metric: MetricDTO) {
    const result = await this.metricService.execute({
      ...metric,
      params: JSON.stringify(metric.params),
    });

    return result;
  }
}
