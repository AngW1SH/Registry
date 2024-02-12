import { Inject, Injectable } from '@nestjs/common';
import { Task, TaskCreate } from './task.entity';
import { Observable } from 'rxjs';
import { ClientGrpc } from '@nestjs/microservices';

interface TaskServiceGRPC {
  start: (data: { task: TaskCreate }) => Observable<Task>;
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

  start(task: TaskCreate) {
    return this.taskServiceGRPC.start({ task });
  }

  list() {
    return this.taskServiceGRPC.list({});
  }
}
