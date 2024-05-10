import { ApiProperty } from '@nestjs/swagger';
import { MetricNames } from './config/metricNames';
import { MetricParam, MetricParamType } from './config/types';
import { UnitOfTime } from '@/utils/duration';

export interface AbstractMetricDTO {
  id: string;
  name: string;
}

export interface AbstractMetric {
  name: string;
}

export interface AbstractMetricDetailed extends AbstractMetric {
  dependencies: MetricNames[];
  snapshotBased: boolean;
}

export interface MetricDTO {
  id: string;
  name: string;
  params: MetricParam[];
  resource: string;
}

export interface Metric {
  id: string;
  name: string;
  params: string;
  resource: string;
}

export class MetricDTO {
  @ApiProperty({
    description: 'Metric ID (UUID)',
    example: '123e4567-e89b-12d3-a456-426655440000',
  })
  id: string;

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

export type MetricCreate = Omit<Metric, 'id'>;
