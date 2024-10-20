import {CustomaryHTMLElement} from "customary/CustomaryHTMLElement.js";
import {CustomaryOptions} from "customary/CustomaryOptions.js";

export class HelloWorld extends CustomaryHTMLElement {
    static customary: CustomaryOptions<HelloWorld> = {
        config: {name: 'hello-world'},
        hooks: {externalLoader: {import_meta: import.meta}}
    }
}