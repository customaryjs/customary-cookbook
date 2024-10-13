import {CustomaryHTMLElement} from "customary/CustomaryHTMLElement.js";
import {CustomaryOptions} from "customary/CustomaryOptions.js";

export class HelloWorld extends CustomaryHTMLElement {
    static customary: CustomaryOptions = {name: 'hello-world', externalLoaderOptions: {import_meta: import.meta}}
}