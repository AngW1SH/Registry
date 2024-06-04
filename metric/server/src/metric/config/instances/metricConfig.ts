import { MetricName } from './metricNames';
import { MetricConfig, MetricParamType, UnitOfTime } from '../types';
import { PlatformName } from '@/src/platform/platform.entity';

export const metricConfig: { [key in MetricName]: MetricConfig } = {
  [MetricName.TotalCommits]: {
    dependencies: [MetricName.Commits],
    snapshotBased: false,
    platform: PlatformName.GitHub,
    params: [
      {
        type: MetricParamType.boolean,
        name: 'isGraded',
        value: true,
      },
      {
        type: MetricParamType.text,
        name: 'gradeWeight',
        value: '1',
      },
    ],
  },
  [MetricName.Commits]: {
    dependencies: [],
    snapshotBased: true,
    isPublic: true,
    platform: PlatformName.GitHub,
    params: [
      {
        type: MetricParamType.duration,
        name: 'updateRate',
        value: {
          number: 2,
          unitOfTime: UnitOfTime.weeks,
        },
      },
      {
        type: MetricParamType.text,
        name: 'weight',
        value: '1',
      },
    ],
  },
  [MetricName.Issues]: {
    dependencies: [],
    snapshotBased: true,
    isPublic: true,
    platform: PlatformName.GitHub,
    params: [
      {
        type: MetricParamType.duration,
        name: 'updateRate',
        value: {
          number: 2,
          unitOfTime: UnitOfTime.weeks,
        },
      },
      {
        type: MetricParamType.text,
        name: 'weight',
        value: '1',
      },
    ],
  },
  [MetricName.IssueCompleteness]: {
    dependencies: [MetricName.Issues],
    snapshotBased: false,
    platform: PlatformName.GitHub,
    params: [
      {
        type: MetricParamType.boolean,
        name: 'isGraded',
        value: true,
      },
      {
        type: MetricParamType.text,
        name: 'gradeWeight',
        value: '10',
      },
    ],
  },
  [MetricName.PullRequests]: {
    dependencies: [],
    snapshotBased: true,
    isPublic: true,
    platform: PlatformName.GitHub,
    params: [
      {
        type: MetricParamType.duration,
        name: 'updateRate',
        value: {
          number: 2,
          unitOfTime: UnitOfTime.weeks,
        },
      },
      {
        type: MetricParamType.text,
        name: 'weight',
        value: '1',
      },
    ],
  },
  [MetricName.PullRequestHangTime]: {
    dependencies: [MetricName.PullRequests],
    snapshotBased: false,
    platform: PlatformName.GitHub,
    params: [
      {
        type: MetricParamType.boolean,
        name: 'isGraded',
        value: true,
      },
      {
        type: MetricParamType.text,
        name: 'gradeWeight',
        value: '1',
      },
    ],
  },
  [MetricName.RapidPullRequests]: {
    dependencies: [MetricName.PullRequests],
    snapshotBased: false,
    platform: PlatformName.GitHub,
    params: [
      {
        type: MetricParamType.boolean,
        name: 'isGraded',
        value: true,
      },
      {
        type: MetricParamType.text,
        name: 'gradeWeight',
        value: '1',
      },
      {
        type: MetricParamType.duration,
        name: 'rapidPullRequestsThreshold',
        value: {
          number: 3,
          unitOfTime: UnitOfTime.minutes,
        },
      },
    ],
  },
  Grade: {
    dependencies: [],
    snapshotBased: true,
    isPublic: true,
    platform: PlatformName.GitHub,
    params: [
      {
        type: MetricParamType.duration,
        name: 'updateRate',
        value: {
          number: 2,
          unitOfTime: UnitOfTime.weeks,
        },
      },
      {
        type: MetricParamType.text,
        name: 'weight',
        value: '1',
      },
    ],
  },
  [MetricName.DominantWeekDay]: {
    dependencies: [
      MetricName.Commits,
      MetricName.Issues,
      MetricName.PullRequests,
    ],
    snapshotBased: false,
    platform: PlatformName.GitHub,
    params: [
      {
        type: MetricParamType.boolean,
        name: 'isGraded',
        value: true,
      },
      {
        type: MetricParamType.text,
        name: 'gradeWeight',
        value: '1',
      },
      {
        type: MetricParamType.selectText,
        options: [
          'Not Specified',
          'Monday',
          'Tuesday',
          'Wednesday',
          'Thursday',
          'Friday',
          'Saturday',
          'Sunday',
        ],
        name: 'unwantedWeekDay',
        value: 'Not Specified',
      },
    ],
  },
  [MetricName.CodeChurn]: {
    dependencies: [MetricName.Commits],
    snapshotBased: false,
    platform: PlatformName.GitHub,
    params: [
      {
        type: MetricParamType.boolean,
        name: 'isGraded',
        value: true,
      },
      {
        type: MetricParamType.text,
        name: 'gradeWeight',
        value: '1',
      },
    ],
  },
  [MetricName.CodeOwnership]: {
    dependencies: [MetricName.Commits],
    snapshotBased: false,
    platform: PlatformName.GitHub,
    params: [
      {
        type: MetricParamType.boolean,
        name: 'isGraded',
        value: true,
      },
      {
        type: MetricParamType.text,
        name: 'gradeWeight',
        value: '1',
      },
    ],
  },
};
