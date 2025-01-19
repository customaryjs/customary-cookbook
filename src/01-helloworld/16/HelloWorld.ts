import {CustomaryElement, CustomaryDeclaration} from "#customary";

export class HelloWorld extends CustomaryElement {
    static customary: CustomaryDeclaration<HelloWorld> = {
        name: 'hello-world',
        hooks: {externalLoader: {import_meta: import.meta, css_dont: true}}
    }
}