import { User } from 'src/auth/user.entity';
import { EntityRepository, Repository } from 'typeorm';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetFilterTasksDto } from './dto/get-tasks-filter.dto';
import { TaskStatus } from './task-status.enum';
import { TaskEntity } from './task.entity';

@EntityRepository(TaskEntity)
export class TaskRepository extends Repository<TaskEntity> {
  /**
   * @description use query builder to execute the query based on the given object
   * @param filterDto Data transfer object
   */
  async getTasks(filterDto: GetFilterTasksDto): Promise<TaskEntity[]> {
    const { search, status } = filterDto;

    const query = this.createQueryBuilder('task');

    if (status) {
      query.andWhere('task.status = :status', { status });
    }

    if (search) {
      query.andWhere(
        'task.title LIKE :search OR task.description LIKE :search',
        { search: `%${search}%` },
      );
    }

    let tasks = await query.getMany();
    return tasks;
  }

  async createTask(
    createTaskDto: CreateTaskDto,
    user: User,
  ): Promise<TaskEntity> {
    const { title, description } = createTaskDto;

    const task = new TaskEntity();

    task.title = title;

    task.description = description;

    task.status = TaskStatus.OPEN;

    task.user = user;

    await task.save();

    delete task.user;

    return task;
  }
}
