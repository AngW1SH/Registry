import { PlatformName } from '../platform/platform.entity';
import { ApiProperty } from '@nestjs/swagger';
import { ResourceFieldType } from '../resource/config/types';

export interface ImportResource {
  name: string;
  platform: PlatformName;
  params: string;
}

export class ImportResource {
  @ApiProperty({ name: 'name', example: 'citec-spby/Registry' })
  name: string;

  @ApiProperty({ name: 'platform', example: PlatformName.GitHub })
  platform: PlatformName;

  @ApiProperty({
    description: 'Resource parameters in JSON format',
    example: JSON.stringify([
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
    ]),
  })
  params: string;
}

export interface ImportMember {
  name: string;
  roles: string[];
  identifiers: {
    platform: PlatformName;
    value: string;
  }[];
}

export class ImportMember {
  @ApiProperty({ name: 'name', example: 'Петров Петр Петрович' })
  name: string;

  @ApiProperty({
    name: 'roles',
    example: ['Разработчик', 'Аналитик'],
    isArray: true,
  })
  roles: string[];

  @ApiProperty({
    name: 'identifiers',
    example: [
      {
        platform: PlatformName.GitHub,
        value: 'github-username',
      },
      {
        platform: PlatformName.GitLab,
        value: 'gitlab-username',
      },
    ],
    isArray: true,
  })
  identifiers: {
    platform: PlatformName;
    value: string;
  }[];
}

export interface ImportUser {
  name: string;
  identifiers: {
    platform: PlatformName;
    value: string;
  }[];
}

export interface User {
  id: string;
  name: string;
}

export class ImportUser {
  @ApiProperty({ name: 'name', example: 'Петров Петр Петрович' })
  name: string;

  @ApiProperty({
    name: 'identifiers',
    example: [
      {
        platform: PlatformName.GitHub,
        value: 'github-username',
      },
      {
        platform: PlatformName.GitLab,
        value: 'gitlab-username',
      },
    ],
    isArray: true,
  })
  identifiers: {
    platform: PlatformName;
    value: string;
  }[];
}

export interface ImportProject {
  id: string | number;
  name: string;
  description: string;
  dateStart: string | null;
  dateEnd: string | null;
  resources: ImportResource[];
  members: ImportMember[];
}

export class ImportProject {
  @ApiProperty({ name: 'id', example: '1' })
  id: string | number;

  @ApiProperty({
    name: 'name',
    example: 'Реестр проектов клинической практики',
  })
  name: string;

  @ApiProperty({
    name: 'description',
    example: 'Веб-сервис для управления и мониторинга проектов',
  })
  description: string;

  @ApiProperty({ name: 'dateStart', example: '2020-01-01' })
  dateStart: string | null;

  @ApiProperty({ name: 'dateEnd', example: '2020-12-31' })
  dateEnd: string | null;

  @ApiProperty({
    name: 'resources',
    type: ImportResource,
    isArray: true,
  })
  resources: ImportResource[];

  @ApiProperty({
    name: 'members',
    type: ImportMember,
    isArray: true,
  })
  members: ImportMember[];
}

export class ImportProjectRequestBody {
  @ApiProperty({ type: ImportProject })
  data: ImportProject;
}
