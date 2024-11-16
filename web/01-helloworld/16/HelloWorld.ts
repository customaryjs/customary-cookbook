import {CustomaryLitElement} from "#customary/lit/CustomaryLitElement.js";
import {CustomaryOptions} from "#customary/CustomaryOptions.js";

export class HelloWorld extends CustomaryLitElement {
    static customary: CustomaryOptions<HelloWorld> = {
        config: {name: 'hello-world'},
        hooks: {externalLoader: {import_meta: import.meta}}
    }
}