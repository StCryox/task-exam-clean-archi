import { Task, TaskRepo } from "../core";

export function fakeTaskRepo(): TaskRepo {
	const data: Map<string, Task> = new Map();

	return {
		async save(task: Task): Promise<void> {
			data.set(task.id, task);
		}
	}
}