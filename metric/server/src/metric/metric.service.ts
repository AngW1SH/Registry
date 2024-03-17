import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import {
  AbstractMetric,
  Metric,
  MetricCreate,
  MetricWithSnapshots,
} from './metric.entity';

@Injectable()
export class MetricService {
  constructor(private prisma: PrismaService) {}

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

  async create(metric: MetricCreate) {
    const abstractMetric = await this.prisma.metric.findFirst({
      where: {
        name: metric.name,
      },
    });

    if (!abstractMetric) throw new Error('Metric not found');

    const result = await this.prisma.resourceMetric.create({
      data: {
        params: '[]',
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

  populateWithSnapshots(
    metric: Metric,
    snapshots: string[],
  ): MetricWithSnapshots {
    return { ...metric, data: snapshots };
  }
}
