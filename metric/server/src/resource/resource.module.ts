import { Module } from '@nestjs/common';
import { ResourceController } from './resource.controller';
import { ResourceService } from './resource.service';
import { MetricModule } from 'src/metric/metric.module';

@Module({
  imports: [MetricModule],
  controllers: [ResourceController],
  providers: [ResourceService],
})
export class ResourceModule {}
