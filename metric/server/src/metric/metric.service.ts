import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Metric } from './metric.entity';

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

  populateWithSnapshots(metric: Metric, snapshots: string[]) {
    return { ...metric, data: snapshots };
  }
}
