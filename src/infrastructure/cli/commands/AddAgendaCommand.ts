import {Command} from './Command';
import {EntryParser} from "../../domain/EntryParser";
import {OutputStrategy} from "../../domain/OutputStrategy";
import {OutputFlag} from "../flags/OutputFlag";
import {TxtFileExtensionValidator} from "../validator/TxtFileExtensionValidator";
import {NoOutputStrategy} from "../../domain/NoOutputStrategy";

export class AddAgendaCommand implements Command{
  private taskDescription: string;
  private dueDate: Date;
  private task: Task;

    constructor(taskDescription: string, dueDate?: Date) {
        this.taskDescription = taskDescription;
        this.dueDate = dueDate;
        this.task = Task.new();
    }

    run(): void {
        if(this.outputStrategy instanceof NoOutputStrategy){
            console.log("A flag must be provided. Try running with -s | --simple or -g | --grouped");
            return;
        }
        if(this.filePaths.length === 0){
            console.log("The provided file must be of .txt extension only.")
            return;
        }
        for(let i = 0; i < this.filePaths.length; i++){
            this.task.parseFile(this.filePaths[i]).then(() => console.log(this.getContent()));
        }
    }

    getContent(): string {
        return "Parsing done. Check result in output directory.";
    }
}
