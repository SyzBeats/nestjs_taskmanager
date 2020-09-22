import { Injectable } from '@nestjs/common';
import Task, { TaskStatus } from './task.model';
import { v1 as uuid } from 'uuid';
import { CreateTaskDto } from './dto/create-task.dto';

@Injectable()
export class TasksService {
  private tasks: Task[] = [];

  /* GET ROUTES
  --------------------*/

  getAllTasks(): Task[] {
    return this.tasks;
  }

  getTaskByID(id: string): Task {
    return this.tasks.find(task => task.id === id);
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

  updateTaskByID(id: string, status: TaskStatus): Task {
    for (let task of this.tasks) {
      if (task.id === id) {
        task.status = status;
        return task;
      }
    }
  }

  /* DELETE ROUTES
  --------------------------*/

  deleteTaskByID(id: string): Task[] {
    let filtered = this.tasks.filter(task => task.id !== id);
    this.tasks = filtered;
    return filtered;
  }
}
