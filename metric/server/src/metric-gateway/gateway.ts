import { WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server } from 'socket.io';
import { Data } from './metric-gateway.entity';
import { Snapshot } from 'src/snapshot/snapshot.entity';
import { PrismaService } from 'src/prisma/prisma.service';

@WebSocketGateway()
export class MetricGateway {
  @WebSocketServer()
  server: Server;

  constructor(private prisma: PrismaService) {}

  onModuleInit() {
    this.server.on('connection', (socket) => {
      console.log(socket.id);
    });
  }

  async send(data: Snapshot) {
    const resourceName = data.groups
      .find((g) => g.indexOf('resource:') === 0)
      ?.slice(9);

    const resource = await this.prisma.resource.findFirst({
      where: {
        name: resourceName,
      },
      select: {
        id: true,
        project: {
          select: {
            id: true,
          },
        },
      },
    });

    const metric = await this.prisma.metric.findFirst({
      where: {
        name: data.metric,
      },
    });

    const result: Data = {
      resource: resource.id,
      project: resource.project.id,
      metric: metric.id,
      error: data.error,
      data: data.data,
      timestamp: data.timestamp,
    };

    this.server.emit('message', result);
  }
}
