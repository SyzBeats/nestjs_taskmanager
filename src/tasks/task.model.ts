// define shape of tasks
interface Task {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
}
export default Task;

// ----------- ENUMS ---------- //
export enum TaskStatus {
  OPEN = 'OPEN',
  IN_PROGRESS = 'IN_PROGRESS',
  DONE = 'DONE',
}
