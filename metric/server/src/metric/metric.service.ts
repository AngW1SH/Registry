import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { MetricDTO } from './metric.entity';

@Injectable()
export class MetricService {
  constructor(private prisma: PrismaService) {}

  async findMany(filters: { resource: string }): Promise<MetricDTO[]> {
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
        data: true,
        resourceId: true,
      },
    });

    return result.map((metric) => ({
      id: metric.id,
      name: metric.metric.name,
      resource: metric.resourceId,
      params: metric.data[0] || '',
      data: metric.data,
    }));
  }
}
