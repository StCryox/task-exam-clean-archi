import {Command} from './Command';

export class ErrorCommand implements Command {
    run(): void {
        console.log(this.getContent());
    }

    getContent(): string {
        return `No keyword found. Please type "yarn ocr help" for more information about ocr usage.`;
    }
}