import {CustomaryElement, CustomaryDeclaration, Customary} from "#customary";

export class HelloWorldPart3 extends CustomaryElement {
    static customary: CustomaryDeclaration<HelloWorldPart3> = {
        name: 'hello-world-part-3',
        hooks: {externalLoader: {import_meta: import.meta, css_dont: true}}
    }
}

Customary.declare(HelloWorldPart3);
