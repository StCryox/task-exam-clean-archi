import { Task } from './Task';

export abstract class TaskManager {
  abstract findById(id: string): Promise<Task>;
  abstract remove(task: Task): Promise<void>;
  abstract save(task: Task): Promise<void>;
}