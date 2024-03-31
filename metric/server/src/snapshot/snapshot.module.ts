import { Module } from '@nestjs/common';
import { SnapshotService } from './snapshot.service';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { MetricGatewayModule } from 'src/metric-gateway/metric-gateway.module';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'SNAPSHOT_SERVICE',
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
    MetricGatewayModule,
  ],
  providers: [SnapshotService],
  exports: [SnapshotService],
})
export class SnapshotModule {}
