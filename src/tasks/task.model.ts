import { TaskStatus } from './task-status.enum';

// define shape of tasks
interface Task {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
}
export default Task;
