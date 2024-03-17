import { Module } from '@nestjs/common';
import { SnapshotService } from './snapshot.service';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'TASK_SERVICE',
        transport: Transport.GRPC,
        options: {
          package: 'api',
          protoPath: '../proto/snapshot.proto',
          url: 'localhost:9000',
          loader: {
            keepCase: true,
          },
        },
      },
    ]),
  ],
  providers: [SnapshotService],
})
export class SnapshotModule {}
