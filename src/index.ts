import path from 'path';
import fs from 'fs/promises';
import { jsonTaskRepo } from "./infrastructure/json-task-repo";
import { addTask, deleteTask, listTasks, updateTask } from './core/usecases';
import { v4 } from 'uuid';
import { cli } from './infrastructure/cli/cli';

const fileHandler = {
	async read(path: string): Promise<string> {
		return await fs.readFile(path).then(buffer => buffer.toString('utf8'));
	},
	async write(path: string, content: string): Promise<void> {
		await fs.writeFile(path, content);
	}
}

const dateProvider = () => new Date();
const uuidGenerator = v4;
const taskRepo = jsonTaskRepo(path.join(__dirname, '..', '.consoleAgenda/tasks.json'), fileHandler);
const listTasksUsecase = listTasks(taskRepo);
const updateTaskUsecase = updateTask(taskRepo, dateProvider);
const deleteTaskUsecase = deleteTask(taskRepo);
const addTaskUsecase = addTask(taskRepo, uuidGenerator, dateProvider);

cli(listTasksUsecase, addTaskUsecase, updateTaskUsecase, deleteTaskUsecase);