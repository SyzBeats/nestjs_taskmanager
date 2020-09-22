/**
 * The controllers job ist to receive and return the response.
 * The Service is responsible for all the connected business logic
 */

import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Patch,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import Task, { TaskStatus } from './task.model';
import { CreateTaskDto } from './dto/create-task.dto';

@Controller('tasks')
export class TasksController {
  // auto private
  constructor(private tasksService: TasksService) {}

  @Get()
  getAllTasks(): Task[] {
    return this.tasksService.getAllTasks();
  }

  /**
   * @description Nest knows that the route is /:id
   *              and expects the query Param to be a string
   *              this will be forwarded to the service
   */
  @Get('/:id')
  getTaskByID(@Param('id') id: string): Task {
    return this.tasksService.getTaskByID(id);
  }

  /**
   * @description create a task based on DTO
   * @param createTaskDto
   */
  @Post()
  createTask(@Body() createTaskDto: CreateTaskDto): Task {
    return this.tasksService.createTask(createTaskDto);
  }

  /**
   * @description Update a task with an id and return updated Task
   * @param id task that will be updated
   */
  @Patch('/:id/status')
  updateTaskByID(
    @Param('id') id: string,
    @Body('status') status: TaskStatus,
  ): Task {
    return this.tasksService.updateTaskByID(id, status);
  }

  /**
   * @description Delete a task with an id and return new Array
   * @param id task that will be deleted
   */
  @Delete('/:id')
  deleteTaskByID(@Param('id') id: string): Task[] {
    return this.tasksService.deleteTaskByID(id);
  }
}
