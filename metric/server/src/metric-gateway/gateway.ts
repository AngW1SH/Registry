import { WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server } from 'socket.io';
import { Data } from './metric-gateway.entity';
import { Snapshot } from 'src/snapshot/snapshot.entity';
import { PrismaService } from 'src/prisma/prisma.service';
import { metricHooks } from './utils/metricHooks';

@WebSocketGateway({ cors: true })
export class MetricGateway {
  @WebSocketServer()
  server: Server;

  constructor(private prisma: PrismaService) {}

  onModuleInit() {
    this.server.on('connection', (socket) => {
      console.log('Connected: ' + socket.id);
    });
  }

  async send(data: Snapshot[]) {
    // Get all resources
    // Technically the core-server will only return snapshots for a single resource (and metric, for that matter)
    // but I figured it's better to query all resources anyway to avoid unexpected issues later
    const resources = await this.prisma.resource.findMany({
      select: {
        id: true,
        name: true,
        project: {
          select: {
            id: true,
          },
        },
        metrics: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });

    const result: Data[] = [];

    try {
      for (const snapshot of data) {
        // Extract the resource name
        const resourceName = snapshot.groups
          .find((g) => g.indexOf('resource:') === 0)
          ?.slice(9);

        // Find the resource and metric
        const resource = resources.find((r) => r.name === resourceName);
        const metric = resource.metrics.find((m) => m.name === snapshot.metric);
        if (!resource || !metric) continue;

        // Call metric hooks
        if (metricHooks[snapshot.metric]) {
          metricHooks[snapshot.metric](snapshot, resource.id, this.prisma);
        }

        if (resource && metric)
          result.push({
            resource: resource.id,
            project: resource.project.id,
            metric: metric.id,
            error: snapshot.error,
            data: JSON.parse(snapshot.data),
            timestamp: snapshot.timestamp,
          });
      }

      this.server.emit('message', result);
    } catch (err) {
      console.log(err);
    }
  }
}
