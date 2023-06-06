import {Command} from './Command';

export class HelpCommand implements Command {
    private helpText: string =
    `A task is a description of an activity to be done.
    
        usage: yarn ocr [command][flag][filePath ...]
    
        Commands:
            agenda add         adds a task
            agenda update      updates the task
            agenda remove      removes a task
            agenda list        lists all tasks
    
        Flags:
            -c "hello world" : to add the content 
                          
            -d:2022-03-01 : to add the date 

            -s:done : 
                          
    `;

    run(): void {
      console.log(this.helpText);
    }

    getContent(): string {
        return `ocr is an Optical Character Recognition tool in CLI. Type "yarn ocr help" for more information.`;
    }
}
