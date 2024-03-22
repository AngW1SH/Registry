import { PlatformName } from 'src/platform/platform.entity';
import { ResourceConfig } from './types';
import { githubConfig } from './platforms/github';

export const configs: { [key in PlatformName]: ResourceConfig } = {
  GitHub: githubConfig,
  GitLab: githubConfig,
};
