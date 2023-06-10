import { Command } from "commander";
import { AddTaskUsecase, RemoveTaskUsecase, ListTaskUsecase, UpdateTaskUsecase } from "../../core/usecases";

export function buildListCommand(usecase: ListTaskUsecase): Command {
	const listCommand = new Command("list");
	listCommand
		.summary("List all tasks")
		.action(async () => {
			try {
				console.log(await usecase());
			} catch (error: any) {
				console.log(error.message);
			}
			
		})

	return listCommand;
}

export function buildAddCommand(usecase: AddTaskUsecase): Command {
	const addCommand = new Command("add");
	addCommand
		.summary("Add a new task")
		.requiredOption("-d, --description <description>", "Task description")
		.option("-dd, --due-date <dueDate>", "Task due date")
		.action(async (values) => {
			try {
				const _dueDate = values.dueDate ? new Date(values.dueDate) : undefined;
				await usecase({description: values.description, dueDate: _dueDate});
			} catch (error: any) {
				console.log(error.message);
			}
		});

	return addCommand;
}

export function buildUpdateCommand(usecase: UpdateTaskUsecase): Command {
	const updateCommand = new Command("update");
	updateCommand
		.summary("Update a task")
		.argument("<id>", "Task id")
		.option("-dd, --due-date <dueDate>", "Task due date")
		.option("-s, --state <state>", "Task state")
		.action(async (id, values) => {
			try {
				const _dueDate = values.dueDate ? new Date(values.dueDate) : undefined;
				await usecase(
					{id, dueDate: _dueDate, state: values.state}
				);
			} catch (error: any) {
				console.log(error.message);
			}
		});

	return updateCommand;
}

export function buildRemoveCommand(usecase: RemoveTaskUsecase): Command {
	const removeCommand = new Command("remove");
	removeCommand
		.summary("remove a task")
		.argument("<id>", "Task id")
		.action(async (id) => {
			try {
				await usecase({id});
			} catch (error: any) {
				console.log(error.message);
			}
		});

	return removeCommand;
}