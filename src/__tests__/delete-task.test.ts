import { TaskRepo } from "../core/task";
import { DeleteTaskRequest } from "../core/dtos";
import { deleteTask } from "../core/usecases"
import { fakeTaskRepo } from "./fake-taks-repo";

type DeleteTaskUsecase = ReturnType<typeof deleteTask>;

describe('Delete Task', () => {
	let taskRepo: TaskRepo;
	let usecase: DeleteTaskUsecase;

	const defaultId = 'task1';

	beforeEach(() => {
		taskRepo = fakeTaskRepo();
		usecase = deleteTask(taskRepo);
	})

	it('should resolve void', async () => {
		const spyFind = jest.spyOn(taskRepo, 'findById');
		const spyRemove = jest.spyOn(taskRepo, 'remove');

		await expect(usecase({ id: defaultId })).resolves.toBeUndefined();

		expect(spyFind).toBeCalledTimes(1);
		expect(spyRemove).toBeCalledTimes(1);
	})

	it('should reject when the task does not exist', async () => {
		const spyFind = jest.spyOn(taskRepo, 'findById');
		const spyRemove = jest.spyOn(taskRepo, 'remove');

		await expect(usecase({ id: 'fake' })).rejects.toHaveProperty('message', 'Task does not exist.');

		expect(spyFind).toBeCalledTimes(1);
		expect(spyRemove).not.toBeCalled();
	})
})