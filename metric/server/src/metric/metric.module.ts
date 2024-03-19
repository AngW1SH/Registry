import { Module } from '@nestjs/common';
import { MetricService } from './metric.service';
import { MetricController } from './metric.controller';
import { TaskModule } from 'src/task/task.module';

@Module({
  imports: [TaskModule],
  providers: [MetricService],
  exports: [MetricService],
  controllers: [MetricController],
})
export class MetricModule {}
