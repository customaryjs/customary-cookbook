import {CustomaryOptions} from "#customary/index.js";
import {CustomaryLitElement} from "#customary/lit/CustomaryLitElement.js";

export class HelloWorldPart3 extends CustomaryLitElement {
    static customary: CustomaryOptions<HelloWorldPart3> = {
        config: {name: 'hello-world-part-3'},
        hooks: {externalLoader: {import_meta: import.meta}}
    }
}