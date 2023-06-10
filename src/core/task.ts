import { DateProvider } from "./services";

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
	findAll(): Promise<Task[]>;
	findById(id: string): Promise<Task | null>;
	remove(task: Task): Promise<void>;
	save(task: Task): Promise<void>;
}

export type TaskState =
	| 'todo'
	| 'pending'
	| 'progress'
	| 'done'
	| 'cancelled'
	| 'closed';

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

export function modifyTask(task: Task, dateProvider: DateProvider, state?: TaskState, dueDate?: Date): Task {
	const newState = state ? state : task.state;
	const newDueDate = dueDate ? dueDate : task.dueDate;

	if (newState === 'closed') {
		return { ...task, state: newState, dueDate: newDueDate, closeDate: dateProvider() };
	}
	return { ...task, state: newState, dueDate: newDueDate };
}

export function isValidState(state: unknown): state is TaskState {
	return typeof state === 'string' && [
		'todo',
		'pending',
		'progress',
		'done',
		'cancelled',
		'closed'
	].includes(state);
}