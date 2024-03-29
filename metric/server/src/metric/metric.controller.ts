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
  MetricCreate,
  MetricDTO,
  MetricWithSnapshotsDTO,
} from './metric.entity';
import { MetricService } from './metric.service';

@Controller('metric')
export class MetricController {
  constructor(private metricService: MetricService) {}

  @Put(':id')
  async update(@Param('id') id: string, @Body('metric') metric: MetricDTO) {
    const result = await this.metricService.updateParams({
      ...metric,
      params: JSON.stringify(metric.params),
      isTracked: null,
    });

    return result;
  }

  @Post()
  async create(@Body() metric: MetricCreate): Promise<MetricWithSnapshotsDTO> {
    const result = await this.metricService.create(metric);

    return {
      ...result,
      params: JSON.parse(result.params),
    };
  }

  @Post(':id/start')
  async start(@Body('metric') metric: MetricDTO) {
    const result = await this.metricService.start({
      ...metric,
      params: JSON.stringify(metric.params),
      isTracked: null,
    });

    return result;
  }

  @Post(':id/stop')
  async stop(@Param('id') id: string) {
    const result = await this.metricService.stop(id);

    return result;
  }

  @Get()
  async listAll(): Promise<string[]> {
    const result = await this.metricService.listAll();

    return result;
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    const result = await this.metricService.deleteOne(id);

    return result;
  }
}
