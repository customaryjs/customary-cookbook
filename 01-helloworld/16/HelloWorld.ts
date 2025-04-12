import {CustomaryElement, CustomaryDeclaration, Customary} from "#customary";
import {HelloWorldPart1} from "./HelloWorldPart1.js";
import {HelloWorldPart2} from "./HelloWorldPart2.js";
import {HelloWorldPart3} from "./HelloWorldPart3.js";

export class HelloWorld extends CustomaryElement {
    static customary: CustomaryDeclaration<HelloWorld> = {
        name: 'hello-world',
        hooks: {
            requires: [HelloWorldPart1, HelloWorldPart2, HelloWorldPart3],
            externalLoader: {import_meta: import.meta, css_dont: true}
        }
    }
}

Customary.declare(HelloWorld);
