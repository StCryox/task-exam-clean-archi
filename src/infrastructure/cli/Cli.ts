
import { Command } from "commander";
import { buildAddCommand, buildListCommand, buildRemoveCommand, buildUpdateCommand } from "./commands";
import figlet from "figlet";
import { AddTaskUsecase, DeleteTaskUsecase, ListTaskUsecase, UpdateTaskUsecase } from "../../core/usecases";

export function cli(
	listTasksUsecase: ListTaskUsecase, 
	addTaskUsecase: AddTaskUsecase, 
	updateTaskUsecase: UpdateTaskUsecase, 
	removeTaskUsecase: DeleteTaskUsecase
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