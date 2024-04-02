import { Module } from '@nestjs/common';
import { TaskService } from './task.service';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'TASK_SERVICE',
        transport: Transport.GRPC,
        options: {
          package: 'api',
          protoPath: '../proto/task.proto',
          url: 'localhost:9000',
          loader: {
            keepCase: true,
          },
        },
      },
    ]),
  ],
  providers: [TaskService],
  exports: [TaskService],
})
export class TaskModule {}
