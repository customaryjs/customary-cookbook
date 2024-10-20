import {CustomaryHTMLElement} from "customary/CustomaryHTMLElement.js";
import {CustomaryOptions} from "customary/CustomaryOptions.js";

export class HelloWorldPart3 extends CustomaryHTMLElement {
    static customary: CustomaryOptions<HelloWorldPart3> = {
        config: {name: 'hello-world-part-3'},
        hooks: {externalLoader: {import_meta: import.meta}}
    }
}