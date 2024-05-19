import { MetricName } from '@/src/metric/config/instances/metricNames';
import { PrismaService } from '@/src/prisma/prisma.service';
import { Resource } from '@/src/resource/resource.entity';
import { Snapshot } from '@/src/snapshot/snapshot.entity';

export const metricHooks: {
  [key in string]: (
    snapshot: Snapshot,
    resourceId: string,
    prisma: PrismaService,
  ) => void;
} = {
  [MetricName.Grade]: async (
    snapshot: Snapshot,
    resourceId: string,
    prisma: PrismaService,
  ) => {
    const result = await prisma.resource.update({
      where: {
        id: resourceId,
      },
      data: {
        grade: snapshot.data,
      },
    });
  },
};
