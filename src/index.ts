import path from 'path';
import fs from 'fs/promises';
import { jsonTaskRepo } from "./json-task-repo";
import { addTask, deleteTask, findTask, listTasks, updateTask } from './usecases';

const fileHandler = {
	async read(path: string): Promise<string> {
		return await fs.readFile(path).then(buffer => buffer.toString('utf8'));
	},
	async write(path: string, content: string): Promise<void> {
		await fs.writeFile(path, content);
	}
}

const taskRepo = jsonTaskRepo(path.join(__dirname, '..', '.consoleAgenda/tasks.json'), fileHandler);
const listTasksUsecase = listTasks(taskRepo);
const findTaskUsecase = findTask(taskRepo);
const updateTaskUsecase = updateTask(taskRepo);
const deleteTaskUsecase = deleteTask(taskRepo);
const addTaskUsecase = addTask(taskRepo);

async function main() {
	console.log(await listTasksUsecase());
	console.log('----------------------');

	console.log(await findTaskUsecase({ id: '1441600d-90f6-43d2-af0d-9ee395bd57bd' }));
	console.log('----------------------');

	await updateTaskUsecase({ id: '1441600d-90f6-43d2-af0d-9ee395bd57bd', state: 'pending' });
	console.log(await listTasksUsecase());
	console.log('----------------------');

	await deleteTaskUsecase({ id: '1441600d-90f6-43d2-af0d-9ee395bd57bd' });
	console.log(await listTasksUsecase());
	console.log('----------------------');

	await addTaskUsecase({ description: 'test' });
	console.log(await listTasksUsecase());
	console.log('----------------------');
}

main().catch(console.error);