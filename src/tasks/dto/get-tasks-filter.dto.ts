import { TaskStatus } from '../task.model';

export class GetFilterTasksDto {
  status: TaskStatus;
  search: string;
}
