import { PlatformName } from '../platform/platform.entity';
import { ImportProject } from './import.entity';

export const importProjectMock: ImportProject = {
  id: '1',
  name: 'project1',
  description: 'desc1',
  dateStart: '2021-01-01',
  dateEnd: '2021-01-02',
  resources: [
    {
      name: 'resource1',
      platform: PlatformName.GitHub,
      params: '[{}]',
    },
  ],
  members: [
    {
      name: 'member1',
      roles: ['role1', 'role2'],
      identifiers: [
        {
          platform: PlatformName.GitHub,
          value: 'value1',
        },
      ],
    },
  ],
};
