import { v4 } from "uuid";
import { Task, TaskRepo, isValidState, modifyTask, newTask } from "./core";
import { AddTaskRequest, DeleteTaskRequest, UpdateTaskRequest } from "./dtos";


export const addTask = (taskRepo: TaskRepo) => async (input: AddTaskRequest): Promise<void> => {
	const task = newTask(v4(), input.description, new Date(), input.dueDate);
	await taskRepo.save(task);
}

export const updateTask = (taskRepo: TaskRepo) => async (input: UpdateTaskRequest): Promise<void> => {
	const task = await _getTaskById(taskRepo, input.id);

	if (input.state !== undefined && !isValidState(input.state)) {
		throw new Error('Invalid state.');
	}

	const newTask = modifyTask(task, () => new Date(), input.state, input.dueDate);
	await taskRepo.save(newTask);
}

export const deleteTask = (taskRepo: TaskRepo) => async (input: DeleteTaskRequest): Promise<void> => {
	const task = await _getTaskById(taskRepo, input.id);
	await taskRepo.remove(task);
}



async function _getTaskById(taskRepo: TaskRepo, id: string): Promise<Task> {
	const task = await taskRepo.findById(id);
	if (task === null) {
		throw new Error('Task does not exist.');
	}
	return task;
}