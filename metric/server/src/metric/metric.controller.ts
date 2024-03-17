import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { MetricCreate, MetricDTO } from './metric.entity';
import { MetricService } from './metric.service';

@Controller('metric')
export class MetricController {
  constructor(private metricService: MetricService) {}

  @Put(':id')
  async update(@Param('id') id: string, @Body('metric') metric: MetricDTO) {
    const result = await this.metricService.updateParams({
      ...metric,
      params: JSON.stringify(metric.params),
    });

    return result;
  }

  @Post()
  async create(@Body() metric: MetricCreate) {
    const result = await this.metricService.create(metric);

    return result;
  }

  @Get()
  async listAll(): Promise<string[]> {
    const result = await this.metricService.listAll();

    return result;
  }
}
