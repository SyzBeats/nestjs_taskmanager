import { User } from 'src/auth/user.entity';
import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { TaskStatus } from './task-status.enum';

@Entity()
export class TaskEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  _id: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  status: TaskStatus;

  // many tasks for one user
  @ManyToOne((type) => User, (user) => user.tasks, { eager: false })
  user: User;
}
