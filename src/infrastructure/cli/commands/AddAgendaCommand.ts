import {Command} from './Command';
import {OCR} from "../../domain/OCR";
import {EntryParser} from "../../domain/EntryParser";
import {OutputStrategy} from "../../domain/OutputStrategy";
import {OutputFlag} from "../flags/OutputFlag";
import {TxtFileExtensionValidator} from "../validator/TxtFileExtensionValidator";
import {NoOutputStrategy} from "../../domain/NoOutputStrategy";

export class AddAgendaCommand implements Command{
    private ocr: OCR;
    private readonly outputStrategy: OutputStrategy;
    private filePaths: string[];

    constructor(flag: string, filePaths: string[]) {
        this.outputStrategy = new OutputFlag().getStrategy(flag);
        this.ocr = new OCR(new EntryParser(), this.outputStrategy);
        this.filePaths = new TxtFileExtensionValidator().validate("txt", filePaths);
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
            this.ocr.parseFile(this.filePaths[i]).then(() => console.log(this.getContent()));
        }
    }

    getContent(): string {
        return "Parsing done. Check result in output directory.";
    }
}
