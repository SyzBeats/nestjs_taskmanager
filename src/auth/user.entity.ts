import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';
import * as argon2 from 'argon2';
import { TaskEntity } from 'src/tasks/task.entity';

@Entity()
// username in the user table should be unique
@Unique(['username'])
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  password: string;

  // One user to many tasks
  @OneToMany((type) => TaskEntity, (task) => task.user, { eager: true })
  tasks: TaskEntity[];

  /**
   * @description validate the input against the existing password
   * @param password the users password
   */
  async validatePassword(password: string): Promise<boolean> {
    const hash = await argon2.hash(password);
    return hash === this.password;
  }
}
