import { TaskManager } from '../../model/task'
import { AddTaskRequest } from './AddTaskRequest'
import { Task } from '../../model/task'

export class AddTask {
  constructor(private readonly taskManager: TaskManager) {}

  async execute(input: AddTaskRequest): Promise<void> {
    const dueDate = input.dueDate ? new Date(input.dueDate) : input.dueDate;
    const task = Task.new(input.content, dueDate);
    await this.taskManager.save(task);
  }
}