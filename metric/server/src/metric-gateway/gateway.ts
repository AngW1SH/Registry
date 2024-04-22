import { WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server } from 'socket.io';
import { Data } from './metric-gateway.entity';
import { Snapshot } from 'src/snapshot/snapshot.entity';
import { PrismaService } from 'src/prisma/prisma.service';

@WebSocketGateway({ cors: true })
export class MetricGateway {
  @WebSocketServer()
  server: Server;

  constructor(private prisma: PrismaService) {}

  onModuleInit() {
    this.server.on('connection', (socket) => {
      console.log(socket.id);
    });
  }

  async send(data: Snapshot[]) {
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

    for (const snapshot of data) {
      const resourceName = snapshot.groups
        .find((g) => g.indexOf('resource:') === 0)
        ?.slice(9);

      const resource = resources.find((r) => r.name === resourceName);

      const metric = resource.metrics.find((m) => m.name === snapshot.metric);

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

    console.log('emit ws');
    this.server.emit('message', result);
  }
}
