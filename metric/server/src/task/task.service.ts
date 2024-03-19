import { Inject, Injectable } from '@nestjs/common';
import { Task, TaskCreate } from './task.entity';
import { Observable, firstValueFrom } from 'rxjs';
import { ClientGrpc } from '@nestjs/microservices';

interface TaskServiceGRPC {
  start: (data: { task: TaskCreate }) => Observable<{ Task: Task }>;
  list: (data: {}) => Observable<Task[]>;
}

@Injectable()
export class TaskService {
  private taskServiceGRPC: TaskServiceGRPC;

  constructor(@Inject('TASK_SERVICE') private client: ClientGrpc) {}

  onModuleInit() {
    this.taskServiceGRPC =
      this.client.getService<TaskServiceGRPC>('TaskService');
  }

  async start(task: TaskCreate) {
    const result = await firstValueFrom(this.taskServiceGRPC.start({ task }));

    return result.Task;
  }

  list() {
    return this.taskServiceGRPC.list({});
  }
}
