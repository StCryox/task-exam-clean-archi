qimport {Command} from './Command';

export class ErrorCommand implements Command {
    run(): void {
        console.log(this.getContent());
    }

    getContent(): string {
        return `No keyword found. Please type "agenda help" for more information about agenda usage.`;
    }
}