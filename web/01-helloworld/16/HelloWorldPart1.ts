import {CustomaryOptions} from "#customary/index.js";
import {CustomaryLitElement} from "#customary/lit/CustomaryLitElement.js";

export class HelloWorldPart1 extends CustomaryLitElement {
    static customary: CustomaryOptions<HelloWorldPart1> = {
        config: {name: 'hello-world-part-1'},
        hooks: {externalLoader: {import_meta: import.meta}}
    }
}