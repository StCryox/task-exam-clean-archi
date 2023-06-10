import { Task, TaskRepo } from "../core";

export function fakeTaskRepo(): TaskRepo {
	const data: Map<string, Task> = new Map();
	data.set('task1', {
		id: 'task1',
		state: 'pending',
		creationDate: new Date('2023-06-10'),
		description: 'Teach Ifzas how to FP !',
	});

	return {
		async findById(id: string): Promise<Task | null> {
			return data.get(id) ?? null;
		},

		async remove(task: Task): Promise<void> {
			data.delete(task.id);
		},

		async save(task: Task): Promise<void> {
			data.set(task.id, task);
		}
	}
}