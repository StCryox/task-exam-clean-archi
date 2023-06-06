import { FakeTaskManager } from './FakeTaskManager';
import { AddTask, AddTaskRequest } from '../add-task';

describe('Add task', () => {
  let taskManager: FakeTaskManager;
  let usecase: AddTask;

  beforeEach(() => {
    taskManager = new FakeTaskManager();
    usecase = new AddTask(taskManager);
  });
  
  it('should resolve void', async () => {
    await expect(usecase.execute({
      content: 'Hello from 5AL1',
      dueDate: '2020-01-01'
    })).resolves.toBeUndefined();
  })

  it('should resolve void without due date', async () => {
    await expect(usecase.execute({
      content: 'Hello from 5AL1'
    })).resolves.toBeUndefined();
  })
})