import { Platform } from '@prisma/client';
import { PlatformDTO } from './platform.entity';

export const platformMocks: Platform[] = [
  {
    id: '1',
    name: 'GitHub',
  },
  {
    id: '2',
    name: 'GitLab',
  },
  {
    id: '3',
    name: 'Trello',
  },
];

export const platformDTOMocks: PlatformDTO[] = [
  {
    id: '1',
    name: 'GitHub',
  },
  {
    id: '2',
    name: 'GitLab',
  },
  {
    id: '3',
    name: 'Trello',
  },
];
