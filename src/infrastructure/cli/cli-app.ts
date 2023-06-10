
import { Command } from "commander";
import figlet from "figlet";
import { buildAddCommand, buildListCommand, buildRemoveCommand, buildUpdateCommand } from "./commands";
import { AddTaskUsecase, RemoveTaskUsecase, ListTaskUsecase, UpdateTaskUsecase } from "../../core/usecases";

export function cli(
	listTasksUsecase: ListTaskUsecase, 
	addTaskUsecase: AddTaskUsecase, 
	updateTaskUsecase: UpdateTaskUsecase, 
	removeTaskUsecase: RemoveTaskUsecase
) : void {
	const program = new Command("agenda");
	
	console.log(figlet.textSync("Agenda"));

	program
		.version('0.0.1', '-v, --vers', 'output the current version')
		.description("A task manager in CLI.")
		.addCommand(buildListCommand(listTasksUsecase))
		.addCommand(buildAddCommand(addTaskUsecase))
		.addCommand(buildUpdateCommand(updateTaskUsecase))
		.addCommand(buildRemoveCommand(removeTaskUsecase))
		.parse(process.argv);
}