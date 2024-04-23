import { Module } from '@nestjs/common';
import { SnapshotService } from './snapshot.service';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { MetricGatewayModule } from 'src/metric-gateway/metric-gateway.module';
import { ResubscribeModule } from 'src/resubscribe/resubscribe.module';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'SNAPSHOT_SERVICE',
        transport: Transport.GRPC,
        options: {
          maxReceiveMessageLength: 15 * 1024 * 1024,
          package: 'api',
          protoPath: '../proto/snapshot.proto',
          url: '0.0.0.0:9000',
          loader: {
            keepCase: true,
          },
        },
      },
    ]),
    MetricGatewayModule,
    ResubscribeModule,
  ],
  providers: [SnapshotService],
  exports: [SnapshotService],
})
export class SnapshotModule {}
