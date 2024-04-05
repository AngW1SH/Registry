import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import {
  AbstractMetricDetailed,
  Metric,
  MetricCreate,
  MetricDetailed,
  MetricSnapshot,
} from './metric.entity';
import { IsMetricPublic, metricParams } from './config/metricParams';
import { TaskService } from 'src/task/task.service';
import { durationToSeconds } from 'utils/duration';
import { metricDependencies } from './config/metricDependencies';
import { TaskCreate } from 'src/task/task.entity';
import { MetricNames } from './config/metricNames';

@Injectable()
export class MetricService {
  constructor(
    private prisma: PrismaService,
    private taskService: TaskService,
  ) {}

  async findMany(filters: { resource: string }): Promise<Metric[]> {
    const result = await this.prisma.metric.findMany({
      where: {
        resourceId: filters.resource,
      },
      select: {
        id: true,
        name: true,
        resourceId: true,
        params: true,
      },
    });

    return result.map((metric) => ({
      id: metric.id,
      name: metric.name,
      resource: metric.resourceId,
      params: metric.params || '[]',
    }));
  }

  async listAll(): Promise<AbstractMetricDetailed[]> {
    const result = Object.keys(MetricNames).map((key) => ({
      name: key,
      dependencies: metricDependencies[key] || [],
    }));

    return result;
  }

  async updateParams(metric: Metric): Promise<Metric> {
    try {
      const result = await this.update(metric);
    } catch {
      throw new Error('Failed to update the metric');
    }

    const result = await this.prisma.metric.update({
      where: {
        id: metric.id,
      },
      data: {
        params: metric.params,
      },
      select: {
        id: true,
        name: true,
        resourceId: true,
        params: true,
      },
    });

    return {
      name: result.name,
      id: result.id,
      resource: result.resourceId,
      params: result.params,
    };
  }

  async convertToTask(metric: MetricCreate): Promise<TaskCreate> {
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

    return {
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
    };
  }

  async start(metric: MetricCreate) {
    const task = await this.convertToTask(metric);

    return this.taskService.start(task);
  }

  async update(metric: MetricCreate) {
    const task = await this.convertToTask(metric);

    return this.taskService.update(task);
  }

  async stop(id: string) {
    const metric = await this.prisma.metric.findFirst({
      where: {
        id,
      },
      select: {
        name: true,
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
      metric: metric.name,
      groups: ['project:' + projectName, 'resource:' + resourceName],
    });
  }

  async create(metric: MetricCreate): Promise<MetricDetailed[]> {
    const config = metricParams[metric.name];
    const dependencies = metricDependencies[metric.name];

    const res: MetricDetailed[] = [];

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

    const result = await this.prisma.metric.create({
      data: {
        params: JSON.stringify(config),
        name: metric.name,
        resource: {
          connect: {
            id: metric.resource,
          },
        },
      },
      select: {
        id: true,
        name: true,
        resourceId: true,
        params: true,
      },
    });

    res.push({
      id: result.id,
      name: result.name,
      resource: result.resourceId,
      params: result.params || '[]',
      data: [],
      isTracked: true,
    });

    return res;
  }

  async deleteOne(id): Promise<Metric | null> {
    try {
      const result = await this.stop(id);
    } catch (err) {
      throw new Error('Failed to stop the metric');
    }

    const result = await this.prisma.metric.delete({
      where: {
        id,
      },
      select: {
        id: true,
        params: true,
        name: true,
        resource: {
          select: {
            name: true,
          },
        },
      },
    });

    return {
      id: result.id,
      name: result.name,
      resource: result.resource.name,
      params: result.params,
    };
  }

  populateWithSnapshots(
    metric: Metric,
    snapshots?: MetricSnapshot[],
  ): MetricDetailed {
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

  async execute(metric: Metric) {
    const task = await this.convertToTask(metric);

    const result = await this.taskService.forceExecute({
      metric: task.metric,
      groups: task.groups,
    });

    if (!result) {
      throw new Error('Failed to force execute the metric');
    }
  }
}
