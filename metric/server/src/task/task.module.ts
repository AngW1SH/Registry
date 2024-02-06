import { Module } from '@nestjs/common';
import { TaskService } from './task.service';
import { TaskController } from './task.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'TASK_SERVICE',
        transport: Transport.GRPC,
        options: {
          package: 'api',
          protoPath: '../proto/api.proto',
          url: 'localhost:9000',
          loader: {
            keepCase: true,
          },
        },
      },
    ]),
  ],
  controllers: [TaskController],
  providers: [TaskService],
})
export class TaskModule {}
