import {CommandFactory} from './commands/CommandFactory';

export default class CLI {
  private readonly userArgs: string[];
  private commandFactoryObject: CommandFactory;
  private commandName: string;
  private readonly flag: string;
  private readonly argument: string[];

  constructor() {
    this.userArgs = process.argv.slice(2);
    this.commandFactoryObject = new CommandFactory();
    this.commandName = this.userArgs[0];
    this.flag = this.userArgs[1];
    this.argument = [];
  }

  run(): void {
    if (this.userArgs.length === 0) {
      this.commandName = "help";
    }
    else {
      let index: number = 0;
      for (let i = 2; i < this.userArgs.length; i++) {
        this.argument[index] = this.userArgs[i];
        ++index;
      }
    }

    const commandObject = this.commandFactoryObject.getCommand(this.commandName, this.flag, this.argument);
    commandObject.run();
  }
}