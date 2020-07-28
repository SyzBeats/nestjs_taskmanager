/**
 * The controllers job ist to receive and return the response.
 * The Service is responsible for all the connected business logic
 */

import { Controller, Get } from '@nestjs/common';
import { TasksService } from './tasks.service';
import Task from './task.model';

@Controller('tasks')
export class TasksController {
  // auto private
  constructor(private tasksService: TasksService) {}

  @Get()
  getAllTasks(): Task[] {
    return this.tasksService.getAllTasks();
  }
}
