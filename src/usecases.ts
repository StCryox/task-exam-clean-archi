import { v4 } from "uuid";
import { TaskRepo, newTask } from "./core";
import { AddTaskRequest } from "./dtos";

export const addTask = (taskRepo: TaskRepo) => async (input: AddTaskRequest): Promise<void> => {
	const task = newTask(v4(), input.description, new Date(), input.dueDate);
	await taskRepo.save(task);
}