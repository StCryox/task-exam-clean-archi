import { v4 } from "uuid";
import { TaskRepo, TaskState, isValidState, modifyTask, newTask } from "./core";
import { AddTaskRequest, UpdateTaskRequest } from "./dtos";

export const addTask = (taskRepo: TaskRepo) => async (input: AddTaskRequest): Promise<void> => {
	const task = newTask(v4(), input.description, new Date(), input.dueDate);
	await taskRepo.save(task);
}

export const updateTask = (taskRepo: TaskRepo) => async (input: UpdateTaskRequest): Promise<void> => {
	const task = await taskRepo.findById(input.id);
	if (task === null) {
		throw new Error('Task does not exist.');
	}

	if (input.state !== undefined && !isValidState(input.state)) {
		throw new Error('Invalid state.');
	}

	const newTask = modifyTask(task, () => new Date(), input.state, input.dueDate);
	await taskRepo.save(newTask);
}