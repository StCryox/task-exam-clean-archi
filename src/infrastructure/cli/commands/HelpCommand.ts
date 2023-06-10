import {Command} from './Command';

export class HelpCommand implements Command {
    private helpText: string =
    `A task is a description of an activity to be done.
    
        usage: agenda [command][flag][filePath ...]
    
        Commands:
            agenda add         adds a task
            agenda update      updates the task
            agenda remove      removes a task
            agenda list        lists all tasks
    
        Flags:
            -c "hello world" : to add the content (for add command)
                          
            -d:2022-03-01 : to add the date (for add command)

            -s:done : to add the status of the task (for update command)
                          
    `;

    run(): void {
      console.log(this.helpText);
    }

    getContent(): string {
        return `A task is a description of an activity to be done. Type "agenda help" for more information.`;
    }
}
