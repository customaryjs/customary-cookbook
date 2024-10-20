import {CustomaryHTMLElement} from "customary/CustomaryHTMLElement.js";
import {CustomaryOptions} from "customary/CustomaryOptions.js";

export class HelloWorldPart2 extends CustomaryHTMLElement {
    static customary: CustomaryOptions<HelloWorldPart2> = {
        config: {name: 'hello-world-part-2'},
        hooks: {externalLoader: {import_meta: import.meta}}
    }
}