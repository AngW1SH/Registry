import { Module } from '@nestjs/common';
import { MetricService } from './metric.service';
import { MetricController } from './metric.controller';

@Module({
  providers: [MetricService],
  exports: [MetricService],
  controllers: [MetricController],
})
export class MetricModule {}
