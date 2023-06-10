export type NewTask = {
	state: 'todo';
	id: string;
	creationDate: Date;
	dueDate?: Date;
	description: string;
	subTasks?: Task[];
}

export type PendingTask = {
	state: 'pending';
	id: string;
	creationDate: Date;
	dueDate?: Date;
	description: string;
	subTasks?: Task[];
}

export type InProgressTask = {
	state: 'progress';
	id: string;
	creationDate: Date;
	dueDate?: Date;
	description: string;
	subTasks?: Task[];
}

export type DoneTask = {
	state: 'done';
	id: string;
	creationDate: Date;
	dueDate?: Date;
	description: string;
	subTasks?: Task[];
}

export type CancelledTask = {
	state: 'cancelled';
	id: string;
	creationDate: Date;
	dueDate?: Date;
	description: string;
	subTasks?: Task[];
}

export type ClosedTask = {
	state: 'closed';
	id: string;
	creationDate: Date;
	closeDate: Date;
	dueDate?: Date;
	description: string;
	subTasks?: Task[];
}

export type Task = 
	| NewTask
	| PendingTask
	| InProgressTask
	| DoneTask
	| CancelledTask
	| ClosedTask;

export type TaskRepo = {
	save(task: Task): Promise<void>;
}

export function newTask(id: string, description: string, now: Date, dueDate?: Date, subTasks?: Task[]): Task {
	return {
		state: 'todo',
		id,
		creationDate: now,
		description,
		dueDate,
		subTasks
	}
}