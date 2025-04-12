import {CustomaryElement, CustomaryDeclaration, Customary} from "#customary";

export class HelloWorldPart1 extends CustomaryElement {
    static customary: CustomaryDeclaration<HelloWorldPart1> = {
        name: 'hello-world-part-1',
        hooks: {externalLoader: {import_meta: import.meta, css_dont: true}}
    }
}

Customary.declare(HelloWorldPart1);
