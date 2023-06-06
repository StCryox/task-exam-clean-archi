import { Task, TaskManager } from '../../model/task'

export class FakeTaskManager extends TaskManager {
  private _data: Map<string, Task> = new Map();
  
  async findById(id: string): Promise<Task> {
    throw new Error('Implement me');
  }
  
  async remove(task: Task): Promise<void> {
    throw new Error('Implement me');
  }
  
  async save(task: Task): Promise<void> {
    this._data.set(task.id, task);
  }
}