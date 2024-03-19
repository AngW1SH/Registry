import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import {
  AbstractMetric,
  Metric,
  MetricCreate,
  MetricWithSnapshots,
} from './metric.entity';
import { metricParams } from './config/metricParams';
import { TaskService } from 'src/task/task.service';

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
    }));
  }

  async listAll(): Promise<string[]> {
    const result = await this.prisma.metric.findMany();

    return result.map((metric) => metric.name);
  }

  async updateParams(metric: Metric) {
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
    const params = metric.params ? JSON.parse(metric.params) : {};
    delete params['updateRate'];

    const names = await this.prisma.resource.findFirst({
      where: {
        id: metric.resource,
      },
      select: {
        name: true,
        project: {
          select: {
            name: true,
          },
        },
      },
    });

    const [projectName, resourceName] = [names.project.name, names.name];

    return this.taskService.start({
      metric: metric.name,
      weight: 1,
      data: metric.params,
      update_rate: {
        seconds: 1000,
        nanos: 0,
      },
      groups: ['project:' + projectName, 'resource:' + resourceName],
    });
  }

  async create(metric: MetricCreate): Promise<MetricWithSnapshots> {
    const config = metricParams[metric.name];

    if (!config) throw new Error('Metric not found');

    try {
      const result = await this.start(metric);
      console.log(result);
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
        params: JSON.stringify(
          config.map((param) => ({ ...param, value: '' })),
        ),
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

    return {
      id: result.id,
      name: result.metric.name,
      resource: result.resourceId,
      params: result.params || '[]',
      data: [],
    };
  }

  async deleteOne(id) {
    await this.prisma.resourceMetric.delete({
      where: {
        id,
      },
    });
  }

  populateWithSnapshots(
    metric: Metric,
    snapshots: string[],
  ): MetricWithSnapshots {
    return {
      ...metric,
      data: snapshots.map((snapshot) => JSON.parse(snapshot)),
    };
  }
}
