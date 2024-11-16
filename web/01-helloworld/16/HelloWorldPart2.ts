import {CustomaryOptions} from "#customary/index.js";
import {CustomaryLitElement} from "#customary/lit/CustomaryLitElement.js";

export class HelloWorldPart2 extends CustomaryLitElement {
    static customary: CustomaryOptions<HelloWorldPart2> = {
        config: {name: 'hello-world-part-2'},
        hooks: {externalLoader: {import_meta: import.meta}}
    }
}