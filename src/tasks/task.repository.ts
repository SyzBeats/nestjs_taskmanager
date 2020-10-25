import { EntityRepository, Repository } from '@mikro-orm/core';
import { TaskEntity } from './task.entity';

@Repository(TaskEntity)
export class TaskRepository extends EntityRepository<TaskEntity> {
  //add logic here
}
