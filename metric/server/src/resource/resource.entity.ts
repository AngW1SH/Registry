import { ApiProperty } from '@nestjs/swagger';
import {
  Metric,
  MetricDetailed,
  MetricDetailedDTO,
  MetricSnapshot,
} from 'src/metric/metric.entity';
import { IResourceField, ResourceFieldType } from './config/types';

export interface Resource {
  id: string;
  name: string;
  platform: string;
  project: string;
  params: string;
}

export interface ResourceDTO {
  id: string;
  name: string;
  platform: string;
  project: string;
  params: IResourceField[];
}

export class ResourceDTO {
  @ApiProperty({
    description: 'Resource ID (UUID)',
    example: '123e4567-e89b-12d3-a456-426655440000',
  })
  id: string;

  @ApiProperty({
    description: 'Can be any string. Used only for displaying in the UI',
    example: 'citec-spbu/Registry',
  })
  name: string;

  @ApiProperty({
    description: 'Platform ID (UUID)',
    example: '123e4567-e89b-12d3-a456-426655440000',
  })
  platform: string;

  @ApiProperty({
    description: 'Project ID (UUID)',
    example: '123e4567-e89b-12d3-a456-426655440000',
  })
  project: string;

  @ApiProperty({
    description: 'Resource parameters in JSON format',
    example: [
      {
        prop: 'apiKeys',
        type: ResourceFieldType.textArray,
        value: ['key1', 'key2'],
      },
      {
        prop: 'apiEndpoint',
        type: ResourceFieldType.text,
        value: 'https://api.example.com',
      },
    ],
  })
  params: IResourceField[];
}

export interface ResourceDetailedDTO extends ResourceDTO {
  metrics: MetricDetailedDTO[];
}

export class ResourceDetailedDTO extends ResourceDTO {
  @ApiProperty({ type: MetricDetailedDTO, isArray: true })
  metrics: MetricDetailedDTO[];
}

export interface ResourceWithMetrics extends Resource {
  metrics: Metric[];
}

export interface ResourceDetailed extends Resource {
  metrics: MetricDetailed[];
}

export interface ResourceCreateDTO {
  name: string;
  platform: string;
  project: string;
}

export class ResourceCreateDTO {
  @ApiProperty({
    description: 'Can be any string. Used only for displaying in the UI',
    example: 'citec-spbu/Registry',
  })
  name: string;

  @ApiProperty({
    description: 'Platform ID (UUID)',
    example: '123e4567-e89b-12d3-a456-426655440000',
  })
  platform: string;

  @ApiProperty({
    description: 'Project ID (UUID)',
    example: '123e4567-e89b-12d3-a456-426655440000',
  })
  project: string;
}

export class ResourceCreateRequestBody {
  @ApiProperty({ type: ResourceCreateDTO })
  resource: ResourceCreateDTO;
}

export class ResourceUpdateRequestBody {
  @ApiProperty({ type: ResourceDTO })
  resource: ResourceDTO;
}

export interface ResourceCreate {
  name: string;
  platform: string;
  project: string;
}

export interface ResourceSnapshots {
  [metric: string]: MetricSnapshot[];
}
