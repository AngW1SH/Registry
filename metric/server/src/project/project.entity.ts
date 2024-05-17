import {
  ResourceDetailed,
  ResourceDetailedDTO,
} from 'src/resource/resource.entity';
import { PlatformName } from '../platform/platform.entity';
import { ApiProperty } from '@nestjs/swagger';

export interface Project {
  id: string;
  name: string;
  description: string;
  dateStart?: Date;
  dateEnd?: Date;
}

export interface ProjectDTO {
  id: string;
  name: string;
  description: string;
  dateStart?: Date;
  dateEnd?: Date;
}

export class ProjectDTO implements ProjectDTO {
  @ApiProperty({
    description: 'Project ID (UUID)',
    example: '123e4567-e89b-12d3-a456-426655440000',
  })
  id: string;

  @ApiProperty({
    description: 'Project Name',
    example: 'Registry of clinical practice projects',
  })
  name: string;

  @ApiProperty({
    description: 'Project Description',
    example: 'Веб-сервис для управления и мониторинга проектов',
  })
  description: string;
}

export interface ProjectInList extends Project {
  platforms: PlatformName[];
  grade: string;
}

export class ProjectInList implements Project {
  @ApiProperty({
    description: 'Project Platforms',
    example: [PlatformName.GitHub, PlatformName.GitLab],
  })
  platforms: PlatformName[];

  @ApiProperty({
    description: 'Average of its Resource grades',
    example: '4.65',
  })
  grade: string;
}

export interface ProjectMember {
  name: string;
  roles: string[];
  identifiers: {
    platform: PlatformName;
    value: string;
  }[];
}

export interface ProjectDetailed extends Project {
  resources: ResourceDetailed[];
}

export interface ProjectDetailedWithSnapshots extends Project {
  resources: ResourceDetailed[];
  users: ProjectMember[];
}

export interface ProjectDetailedDTO extends ProjectDTO {
  resources: ResourceDetailedDTO[];
}

export class ProjectDetailedDTO extends ProjectDTO {
  @ApiProperty({ type: ResourceDetailedDTO, isArray: true })
  resources: ResourceDetailedDTO[];
}

export interface ProjectCreateDTO {
  name: string;
  description?: string;
}

export class ProjectCreateDTO {
  @ApiProperty({
    description: 'Project Name',
    example: 'Реестр проектов клинической практики',
  })
  name: string;

  @ApiProperty({
    description: 'Project Description',
    example: 'Веб-сервис для управления и мониторинга проектов',
  })
  description?: string;
}

export class ProjectCreateRequestBody {
  @ApiProperty({ type: ProjectCreateDTO })
  project: ProjectCreateDTO;
}

export interface ProjectCreate {
  name: string;
  description?: string;
}

export class ProjectUpdateRequestBody {
  @ApiProperty({ type: ProjectDTO })
  project: ProjectDTO;
}
