
import { Command } from "commander";
import { buildListCommand } from "./commands";
import figlet from "figlet";
import { ListTaskUsecase } from "../../core/usecases";

export function cli(listTasksUsecase: ListTaskUsecase) : void {
	const program = new Command("agenda");
	
	console.log(figlet.textSync("Agenda"));

	program
		.version('0.0.1', '-v, --vers', 'output the current version')
		.description("A task manager in CLI.")
		.addCommand(buildListCommand(listTasksUsecase))
		.parse(process.argv);
}