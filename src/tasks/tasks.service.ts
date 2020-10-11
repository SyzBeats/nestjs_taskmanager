import { Injectable, NotFoundException } from '@nestjs/common';
import Task, { TaskStatus } from './task.model';
import { v1 as uuid } from 'uuid';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetFilterTasksDto } from './dto/get-tasks-filter.dto';

@Injectable()
export class TasksService {
  private tasks: Task[] = [];

  /* GET ROUTES
  --------------------*/

  getAllTasks(): Task[] {
    return this.tasks;
  }

  getTasksWithFilters(filterDto: GetFilterTasksDto): Task[] {
    const { status, search } = filterDto;
    let tasks = this.getAllTasks();

    if (status) tasks.filter(task => task.status === status);
    if (search)
      tasks = tasks.filter(
        task =>
          task.description.includes(search) || task.title.includes(search),
      );
    return tasks;
  }

  getTaskByID(id: string): Task {
    const task = this.tasks.find(task => task.id === id);

    /**
     * this is an inbuilt exception thrown by nest.js which will be handled internally.
     * The Thrown exception therefore also is used by all other routes or methods
     * that internally make use of the getTaskByID method.
     */
    if (!task) {
      throw new NotFoundException(`Task with id ${id} does not exist`);
    } 
    
    return task;
  }

  /* CREATE ROUTES
  ------------------------*/
  /**
   * @description receive from controller, create a new task and return it
   * @param createTaskDto
   * @return Returns new created task
   */
  createTask(createTaskDto: CreateTaskDto): Task {
    const { title, description } = createTaskDto;

    let task: Task = {
      id: uuid(),
      title,
      description,
      status: TaskStatus.OPEN,
    };

    this.tasks.push(task);
    return task;
  }

  /* PATCH ROUTES
  --------------------------*/

  updateTaskStatus(id: string, status: TaskStatus): Task {
    let task = this.getTaskByID(id);
    task.status = status;
    return task;
  }

  /* DELETE ROUTES
  --------------------------*/

  deleteTaskByID(id: string): Task[] {

    // check if found first

    const found = this.getTaskByID(id);

    let filtered = this.tasks.filter(task => task.id !== found.id);
    this.tasks = filtered;
    return filtered;
  }
}
