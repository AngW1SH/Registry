import { Platform } from '@prisma/client';
import { PlatformName } from '../platform/platform.entity';

export interface ImportProject {
  name: string;
  description: string;
  resources: ImportResource[];
  members: ImportMember[];
}

export interface ImportResource {
  name: string;
  platform: PlatformName;
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

export interface ImportUser {
  name: string;
  identifiers: {
    platform: PlatformName;
    value: string;
  }[];
}
