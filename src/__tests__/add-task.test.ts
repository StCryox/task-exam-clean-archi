
import { TaskRepo } from '../core/task';
import { AddTaskUsecase, addTask } from '../core/usecases';
import { fakeIdGenerator } from './fake-id-generator';
import { fakeTaskRepo } from './fake-taks-repo';

describe('Add task', () => {
  let taskRepo: TaskRepo;
	let usecase: AddTaskUsecase;
	const generateId = fakeIdGenerator;

  beforeEach(() => {
    taskRepo = fakeTaskRepo();
		usecase = addTask(taskRepo, generateId, () => new Date('2020-01-01'));
  });
  
  it('should resolve void', async () => {
		const spy = jest.spyOn(taskRepo, 'save').mockImplementation();

    await expect(usecase({
      description: 'Hello from 5AL1',
      dueDate: new Date('2020-01-01')
    })).resolves.toBeUndefined();

		expect(spy).toBeCalledTimes(1);
  })

  it('should resolve void without due date', async () => {
		const spy = jest.spyOn(taskRepo, 'save').mockImplementation();

    await expect(usecase({
      description: 'Hello from 5AL1'
    })).resolves.toBeUndefined();

		expect(spy).toBeCalledTimes(1);
  })
})