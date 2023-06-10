import { Task, TaskRepo } from "../core/task";
import { FileReader, FileWriter } from "../core/services";

export function jsonTaskRepo(filePath: string, fileHandler: FileReader & FileWriter): TaskRepo {
	return {
		async findAll(): Promise<Task[]> {
			return JSON.parse(await fileHandler.read(filePath));
		},

		async findById(id: string): Promise<Task | null> {
			const tasks: Task[] = JSON.parse(await fileHandler.read(filePath));
			return tasks.find(task => task.id === id) ?? null;
		},

		async remove(task: Task): Promise<void> {
			const tasks: Task[] = JSON.parse(await fileHandler.read(filePath));
			const filteredTasks = tasks.filter(t => t.id !== task.id).sort(_sortTasks);
			await fileHandler.write(filePath, JSON.stringify(filteredTasks, null, 2));
		},

		async save(task: Task): Promise<void> {
			const tasks: Task[] = JSON.parse(await fileHandler.read(filePath));
			const filteredTasks = tasks.filter(t => t.id !== task.id);
			filteredTasks.push(task);
			await fileHandler.write(filePath, JSON.stringify(filteredTasks.sort(_sortTasks), null, 2));
		}
	}
}

function _sortTasks(task1: Task, task2: Task): number {
	return new Date(task1.creationDate).getMilliseconds() - new Date(task2.creationDate).getMilliseconds();
}