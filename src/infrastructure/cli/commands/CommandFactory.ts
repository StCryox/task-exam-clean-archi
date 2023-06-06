import {Command} from './Command';
import {HelpCommand} from './HelpCommand';
import {AddAgendaCommand} from './AddAgendaCommand';
import {ErrorCommand} from './ErrorCommand';

export class CommandFactory {
    getCommand(commandName: string, flag: string, argument: string[]): Command {
      switch(commandName){
        case "agenda add":
            return new AddAgendaCommand(flag, argument);
        case "help":
          return new HelpCommand();
        default:
          return new ErrorCommand();
      }
    }

    // For test purpose
    getCommandContent(commandName: string): string {
        switch(commandName){
            case "agenda add":
                return new AddAgendaCommand("", []).getContent();
            case "help":
                return new HelpCommand().getContent();
            default:
                return new ErrorCommand().getContent();
        }
    }
}
