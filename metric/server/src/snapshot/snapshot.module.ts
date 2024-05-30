import { Module } from '@nestjs/common';
import { SnapshotService } from './snapshot.service';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { MetricGatewayModule } from 'src/metric-gateway/metric-gateway.module';
import { ResubscribeModule } from 'src/resubscribe/resubscribe.module';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule,
    ClientsModule.registerAsync([
      {
        name: 'SNAPSHOT_SERVICE',
        imports: [ConfigModule],
        inject: [ConfigService],
        useFactory: (configService: ConfigService) => ({
          transport: Transport.GRPC,
          options: {
            maxReceiveMessageLength: 15 * 1024 * 1024,
            package: 'api',
            protoPath: '../proto/snapshot.proto',
            url:
              configService.get('CORE_HOST') +
              ':' +
              configService.get('CORE_PORT'),
            loader: {
              keepCase: true,
            },
          },
        }),
      },
    ]),
    MetricGatewayModule,
    ResubscribeModule,
  ],
  providers: [SnapshotService],
  exports: [SnapshotService],
})
export class SnapshotModule {}
