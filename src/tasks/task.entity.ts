import { Entity, PrimaryKey, Property } from '@mikro-orm/core';
import { TaskStatus } from './task.model';

@Entity()
export class TaskEntity {
  @PrimaryKey()
  _id: number;

  @Property()
  title: string;

  @Property()
  description: string;

  @Property()
  status: TaskStatus;
}
