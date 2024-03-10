import { Body, Controller, Param, Put } from '@nestjs/common';
import { MetricDTO } from './metric.entity';
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
}
