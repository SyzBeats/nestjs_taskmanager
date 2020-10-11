/**
 * The controllers job ist to receive and return the response.
 * The Service is responsible for all the connected business logic
 */

import {
  Controller,
  Get,
  Post,
  Body,
  Query,
  Param,
  Delete,
  Patch,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import Task, { TaskStatus } from './task.model';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetFilterTasksDto } from './dto/get-tasks-filter.dto';
import { TaskStatusValidationPipe } from './pipes/task-status-validation.pipe';

@Controller('tasks')
export class TasksController {
  // auto private
  constructor(private tasksService: TasksService) {}

  @Get()
  getTasks(@Query(ValidationPipe) filterDTO: GetFilterTasksDto): Task[] {
    if (Object.keys(filterDTO).length === 0) {
      return this.tasksService.getAllTasks();
    } else {
      return this.tasksService.getTasksWithFilters(filterDTO);
    }
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
  @UsePipes(ValidationPipe)
  createTask(@Body() createTaskDto: CreateTaskDto): Task {
    return this.tasksService.createTask(createTaskDto);
  }

  /**
   * @description Update a task with an id and return updated Task
   * @param id task that will be updated
   */
  @Patch('/:id/status')
  updateTaskStatus(
    @Param('id') id: string,
    @Body('status', TaskStatusValidationPipe) status: TaskStatus,
  ): Task {
    return this.tasksService.updateTaskStatus(id, status);
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
