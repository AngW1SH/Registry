import { ApiProperty } from '@nestjs/swagger';
import { MetricName } from './config/instances/metricNames';
import { MetricParam, MetricParamType } from './config/types';
import { UnitOfTime } from '@/utils/duration';
import { PlatformName } from '../platform/platform.entity';

export interface AbstractMetricDTO {
  id: string;
  name: string;
  platform: PlatformName;
}

export interface AbstractMetric {
  name: string;
  platform: PlatformName;
}

export class AbstractMetricDTO {
  @ApiProperty({
    description: 'Metric Name',
    example: 'TotalCommits',
  })
  name: string;
  @ApiProperty({
    description: 'Metric platform',
    example: 'GitHub',
  })
  platform: PlatformName;
}

export interface AbstractMetricDetailed extends AbstractMetric {
  dependencies: MetricName[];
  snapshotBased: boolean;
}

export class AbstractMetricDetailedDTO extends AbstractMetricDTO {
  @ApiProperty({
    description:
      'Metrics that have to be created whenever this metric is created',
    example: [MetricName.Commits, MetricName.Issues],
  })
  dependencies: MetricName[];

  @ApiProperty({
    description:
      'Tells if the metric is snapshot-based, i.e. should the data be fetched from the core-server or is calculated on the frontend in runtime',
  })
  snapshotBased: boolean;
}

export interface MetricCreate {
  name: string;
  params: string;
  resource: string;
}

export interface MetricCreateDTO {
  name: string;
  params: MetricParam[];
  resource: string;
}

export class MetricCreateDTO {
  @ApiProperty({
    description: 'Metric Name',
    example: 'TotalCommits',
  })
  name: string;

  @ApiProperty({
    description: 'Metric parameters in JSON format',
    example: [
      {
        prop: 'isGraded',
        type: MetricParamType.boolean,
        value: false,
      },
      {
        prop: 'updateRate',
        type: MetricParamType.duration,
        value: {
          number: 2,
          unitOfTime: UnitOfTime.weeks,
        },
      },
    ],
  })
  params: MetricParam[];

  @ApiProperty({
    description: 'Resource ID (UUID)',
    example: '123e4567-e89b-12d3-a456-426655440000',
  })
  resource: string;
}

export interface MetricDTO extends MetricCreateDTO {
  id: string;
}

export interface Metric extends MetricCreate {
  id: string;
}

export class MetricDTO extends MetricCreateDTO {
  @ApiProperty({
    description: 'Metric ID (UUID)',
    example: '123e4567-e89b-12d3-a456-426655440000',
  })
  id: string;
}

export interface MetricSnapshot {
  error: string;
  data: string;
  timestamp: number;
}

export class MetricSnapshot {
  @ApiProperty({
    description:
      'Indicates if the snapshot was successful. Empty means no error',
    example: 'API Token is invalid',
  })
  error: string;

  @ApiProperty({
    description:
      'A JSON string with the metric data. Each metric has its own format',
    example: '{ "metric": "value" }',
  })
  data: string;

  @ApiProperty({
    description: 'timestamp of the snapshot in milliseconds',
    example: Date.now(),
  })
  timestamp: number;
}

export interface MetricDetailed extends Metric {
  isTracked?: boolean;
  data: MetricSnapshot[];
}

export interface MetricDetailedDTO extends MetricDTO {
  isTracked?: boolean;
  data: MetricSnapshot[];
}

export class MetricDetailedDTO extends MetricDTO {
  @ApiProperty({
    description:
      'Indicates if the metric is tracked at the moment. Not stored in DB, found through a request to core server',
    example: true,
  })
  isTracked?: boolean;

  @ApiProperty({ type: MetricSnapshot, isArray: true })
  data: MetricSnapshot[];
}

export class MetricUpdateRequestBody {
  @ApiProperty({ type: MetricDTO })
  metric: MetricDTO;
}

export class MetricCreateRequestBody {
  @ApiProperty({ type: MetricCreateDTO })
  metric: MetricCreateDTO;
}
