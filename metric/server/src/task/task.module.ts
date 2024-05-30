import { Module } from '@nestjs/common';
import { TaskService } from './task.service';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule,
    ClientsModule.registerAsync([
      {
        name: 'TASK_SERVICE',
        imports: [ConfigModule],
        inject: [ConfigService],
        useFactory: (configService: ConfigService) => ({
          transport: Transport.GRPC,
          options: {
            maxReceiveMessageLength: 15 * 1024 * 1024,
            package: 'api',
            protoPath: '../proto/task.proto',
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
  ],
  providers: [TaskService],
  exports: [TaskService],
})
export class TaskModule {}
