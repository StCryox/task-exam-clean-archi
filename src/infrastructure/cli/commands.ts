import { Command } from "commander";
import { ListTaskUsecase } from "../../core/usecases";

export function buildListCommand(usecase: ListTaskUsecase): Command {
	
	const listCommand = new Command("list");
	listCommand
		.action(async () => {
			console.log(await usecase());
		})

	return listCommand;
}