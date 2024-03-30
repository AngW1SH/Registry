import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import {
  AbstractMetric,
  AbstractMetricDetailed,
  Metric,
  MetricCreate,
  MetricNames,
  MetricSnapshot,
  MetricWithSnapshots,
} from './metric.entity';
import { IsMetricPublic, metricParams } from './config/metricParams';
import { TaskService } from 'src/task/task.service';
import { durationToSeconds } from 'utils/duration';
import { metricDependencies } from './config/metricDependencies';

@Injectable()
export class MetricService {
  constructor(
    private prisma: PrismaService,
    private taskService: TaskService,
  ) {}

  async findMany(filters: { resource: string }): Promise<Metric[]> {
    const result = await this.prisma.resourceMetric.findMany({
      where: {
        resourceId: filters.resource,
      },
      select: {
        id: true,
        metric: {
          select: {
            name: true,
          },
        },
        resourceId: true,
        params: true,
      },
    });

    return result.map((metric) => ({
      id: metric.id,
      name: metric.metric.name,
      resource: metric.resourceId,
      params: metric.params || '[]',
      data: [],
      isTracked: null,
    }));
  }

  async listAll(): Promise<AbstractMetricDetailed[]> {
    const result = await this.prisma.metric.findMany();

    return result.map((metric) => ({
      ...metric,
      dependencies: metricDependencies[metric.name] || [],
    }));
  }

  async updateParams(metric: Metric) {
    try {
      const result = await this.update(metric);
    } catch {
      throw new Error('Failed to update the metric');
    }

    const result = await this.prisma.resourceMetric.update({
      where: {
        id: metric.id,
      },
      data: {
        params: metric.params,
      },
    });

    return result;
  }

  async start(metric: MetricCreate) {
    let params = metric.params ? JSON.parse(metric.params) : {};
    const weight = params.find((param) => param.name == 'weight');
    const updateRate = params.find((param) => param.name == 'updateRate');
    params = params.filter(
      (param) => param.name != 'updateRate' && param.name != 'weight',
    );

    const names = await this.prisma.resource.findFirst({
      where: {
        id: metric.resource,
      },
      select: {
        name: true,
        params: true,
        project: {
          select: {
            name: true,
          },
        },
      },
    });

    const [projectName, resourceName] = [names.project.name, names.name];

    const resourceParams = JSON.parse(names.params);

    return this.taskService.start({
      metric: metric.name,
      weight: +weight,
      data: JSON.stringify([...params, ...resourceParams]),
      update_rate: {
        seconds: durationToSeconds(
          updateRate?.value || { number: 1, unitOfTime: 'minutes' },
        ),
        nanos: 0,
      },
      groups: ['project:' + projectName, 'resource:' + resourceName],
      is_public: IsMetricPublic[metric.name] || false,
    });
  }

  async update(metric: MetricCreate) {
    let params = metric.params ? JSON.parse(metric.params) : {};
    const weight = params.find((param) => param.name == 'weight');
    const updateRate = params.find((param) => param.name == 'updateRate');
    params = params.filter(
      (param) => param.name != 'updateRate' && param.name != 'weight',
    );

    const names = await this.prisma.resource.findFirst({
      where: {
        id: metric.resource,
      },
      select: {
        name: true,
        params: true,
        project: {
          select: {
            name: true,
          },
        },
      },
    });

    const [projectName, resourceName] = [names.project.name, names.name];

    const resourceParams = JSON.parse(names.params);

    return this.taskService.update({
      metric: metric.name,
      weight: +weight,
      data: JSON.stringify([...params, ...resourceParams]),
      update_rate: {
        seconds: durationToSeconds(
          updateRate?.value || { number: 1, unitOfTime: 'minutes' },
        ),
        nanos: 0,
      },
      groups: ['project:' + projectName, 'resource:' + resourceName],
      is_public: IsMetricPublic[metric.name] || false,
    });
  }

  async stop(id: string) {
    const metric = await this.prisma.resourceMetric.findFirst({
      where: {
        id,
      },
      select: {
        metric: {
          select: {
            name: true,
          },
        },
        resource: {
          select: {
            name: true,
            project: {
              select: {
                name: true,
              },
            },
          },
        },
      },
    });

    const [projectName, resourceName] = [
      metric.resource.project.name,
      metric.resource.name,
    ];

    return this.taskService.stop({
      metric: metric.metric.name,
      groups: ['project:' + projectName, 'resource:' + resourceName],
    });
  }

  async create(metric: MetricCreate): Promise<MetricWithSnapshots[]> {
    const config = metricParams[metric.name];
    const dependencies = metricDependencies[metric.name];

    const res: MetricWithSnapshots[] = [];

    const depsCreateRequests = await Promise.all(
      dependencies.map((name) => this.create({ ...metric, name })),
    );

    depsCreateRequests.forEach((metric) => res.push(...metric));

    if (!config) throw new Error('Metric not found');

    try {
      const result = await this.start({
        ...metric,
        params: JSON.stringify(config),
      });
    } catch {
      throw new Error('Failed to start the metric');
    }

    const abstractMetric = await this.prisma.metric.findFirst({
      where: {
        name: metric.name,
      },
    });

    if (!abstractMetric) throw new Error('Metric not found');

    const result = await this.prisma.resourceMetric.create({
      data: {
        params: JSON.stringify(config),
        resource: {
          connect: {
            id: metric.resource,
          },
        },
        metric: {
          connect: {
            id: abstractMetric.id,
          },
        },
      },
      select: {
        id: true,
        metric: {
          select: {
            name: true,
          },
        },
        resourceId: true,
        params: true,
      },
    });

    res.push({
      id: result.id,
      name: result.metric.name,
      resource: result.resourceId,
      params: result.params || '[]',
      data: [],
      isTracked: null,
    });

    return res;
  }

  async deleteOne(id) {
    try {
      const result = await this.stop(id);
    } catch {
      throw new Error('Failed to stop the metric');
    }

    await this.prisma.resourceMetric.delete({
      where: {
        id,
      },
    });
  }

  populateWithSnapshots(
    metric: Metric,
    snapshots?: MetricSnapshot[],
  ): MetricWithSnapshots {
    return {
      ...metric,
      data:
        snapshots?.map((snapshot) => ({
          error: snapshot.error,
          data: snapshot.data ? JSON.parse(snapshot.data) : '',
          timestamp: snapshot.timestamp,
        })) || [],
    };
  }
}
