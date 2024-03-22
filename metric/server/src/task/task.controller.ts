import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { TaskService } from './task.service';
import { TaskCreateDTO } from './task.entity';

@Controller('task')
export class TaskController {
  constructor(private taskService: TaskService) {}

  @Post()
  add(@Body('task') task: TaskCreateDTO) {
    return this.taskService.start({
      ...task,
      update_rate: {
        nanos: 0,
        seconds: +task.update_rate.seconds,
      },
    });
  }

  @Get()
  list() {
    return this.taskService.list([]);
  }
}
