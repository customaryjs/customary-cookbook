import {CustomaryHTMLElement} from "customary/CustomaryHTMLElement.js";
import {CustomaryOptions} from "customary/CustomaryOptions.js";

export class HelloWorldPart1 extends CustomaryHTMLElement {
    static customary: CustomaryOptions = {name: 'hello-world-part-1', externalLoaderOptions: {import_meta: import.meta}}
}