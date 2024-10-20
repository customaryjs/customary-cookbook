import {CustomaryHTMLElement} from "customary/CustomaryHTMLElement.js";
import {CustomaryOptions} from "customary/CustomaryOptions.js";

export class HelloWorldPart1 extends CustomaryHTMLElement {
    static customary: CustomaryOptions<HelloWorldPart1> = {
        config: {name: 'hello-world-part-1'},
        hooks: {externalLoader: {import_meta: import.meta}}
    }
}