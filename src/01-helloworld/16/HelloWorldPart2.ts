import {CustomaryElement, CustomaryDeclaration} from "#customary";

export class HelloWorldPart2 extends CustomaryElement {
    static customary: CustomaryDeclaration<HelloWorldPart2> = {
        name: 'hello-world-part-2',
        hooks: {externalLoader: {import_meta: import.meta, css_dont: true}}
    }
}