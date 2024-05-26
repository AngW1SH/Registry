import { ApiProperty } from '@nestjs/swagger';

export interface Platform {
  name: string;
}

export interface PlatformDTO {
  name: string;
}

export enum PlatformName {
  GitHub = 'GitHub',
  GitLab = 'GitLab',
}

export class PlatformDTO implements PlatformDTO {
  @ApiProperty({
    description: 'Platform Name',
    example: PlatformName.GitHub,
  })
  name: string;
}
