import { TaskManager } from '../../model/task'
import { AddTaskRequest } from './AddTaskRequest'

export class AddTask {
  constructor(private readonly taskManager: TaskManager) {}

  async execute(input: AddTaskRequest): Promise<void> {
    
  }
}