import { TaskRepo } from "../core/task"
import { UpdateTaskUsecase, updateTask } from "../core/usecases";
import { fakeTaskRepo } from "./fake-taks-repo";

describe('Update task', () => {
	let taskRepo: TaskRepo;
	let usecase: UpdateTaskUsecase;

	const defaultId = 'task1';

	beforeEach(() => {
		taskRepo = fakeTaskRepo();
		usecase = updateTask(taskRepo, () => new Date('2020-01-01'));
	})

	it('should resolve void', async () => {
		const spyFind = jest.spyOn(taskRepo, 'findById');
		const spySave = jest.spyOn(taskRepo, 'save');

		await expect(usecase({
			id: defaultId,
			state: 'cancelled'
		})).resolves.toBeUndefined();

		expect(spyFind).toBeCalledTimes(1);
		expect(spySave).toBeCalledTimes(1);
	})

	it('should throw when task does not exist', async () => {
		const spyFind = jest.spyOn(taskRepo, 'findById');
		const spySave = jest.spyOn(taskRepo, 'save');

		await expect(usecase({
			id: 'fake',
			state: 'cancelled'
		})).rejects.toHaveProperty('message', 'Task does not exist.');

		expect(spyFind).toBeCalledTimes(1);
		expect(spySave).not.toBeCalled();
	})

	it('should throw when new state is invalid', async () => {
		const spyFind = jest.spyOn(taskRepo, 'findById');
		const spySave = jest.spyOn(taskRepo, 'save');

		await expect(usecase({
			id: defaultId,
			state: 'cancelleeeeed'
		})).rejects.toHaveProperty('message', 'Invalid state.');

		expect(spyFind).toBeCalledTimes(1);
		expect(spySave).not.toBeCalled();
	})
})