import { ApiProperty } from '@nestjs/swagger';

export interface Platform {
  id: string;
  name: string;
}

export interface PlatformDTO {
  id: string;
  name: string;
}

export enum PlatformName {
  GitHub = 'GitHub',
  GitLab = 'GitLab',
}

export class PlatformDTO implements PlatformDTO {
  @ApiProperty({
    description: 'Platform ID (UUID)',
    example: '123e4567-e89b-12d3-a456-426655440000',
  })
  id: string;

  @ApiProperty({
    description: 'Platform Name',
    example: PlatformName.GitHub,
  })
  name: string;
}
