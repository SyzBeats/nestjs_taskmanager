import { Injectable, NotFoundException } from '@nestjs/common';
import Task from './task.model';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetFilterTasksDto } from './dto/get-tasks-filter.dto';
import { TaskRepository } from './task.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { TaskEntity } from './task.entity';
import { TaskStatus } from './task-status.enum';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(TaskRepository)
    private taskRepository: TaskRepository,
  ) {}

  async getTaskById(id: number): Promise<TaskEntity> {
    const found = await this.taskRepository.findOne(id);
    if (!found) {
      throw new NotFoundException(`The task with ID ${id} was not found`);
    }
    return found;
  }

  getTasks(filterDto: GetFilterTasksDto): Promise<TaskEntity[]> {
    return this.taskRepository.getTasks(filterDto);
  }

  async createTask(createTaskDto: CreateTaskDto) {
    return this.taskRepository.createTask(createTaskDto);
  }

  async deleteTaskById(id: number): Promise<number> {
    const deleted = await this.taskRepository.delete(id);
    if (!deleted) throw new NotFoundException(`Task with ID ${id} not found`);
    return id;
  }

  async updateTaskStatus(id: number, status: TaskStatus): Promise<TaskEntity> {
    let task = await this.getTaskById(id);
    task.status = status;
    await task.save();
    return task;
  }
}
