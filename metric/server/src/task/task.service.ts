import { Inject, Injectable } from '@nestjs/common';
import { Task, TaskCreate, TaskStop } from './task.entity';
import { Observable, firstValueFrom } from 'rxjs';
import { ClientGrpc } from '@nestjs/microservices';

interface TaskServiceGRPC {
  start: (data: { task: TaskCreate }) => Observable<{ Task: Task }>;
  list: (data: {}) => Observable<Task[]>;
  update: (data: { task: TaskCreate }) => Observable<{ Task: Task | null }>;
  stop: (data: TaskStop) => Observable<{ Task: Task }>;
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

  async update(task: TaskCreate) {
    const result = await firstValueFrom(this.taskServiceGRPC.update({ task }));

    return result.Task;
  }

  list() {
    return this.taskServiceGRPC.list({});
  }

  async stop(task: TaskStop) {
    const result = await firstValueFrom(this.taskServiceGRPC.stop(task));

    return result.Task;
  }
}
