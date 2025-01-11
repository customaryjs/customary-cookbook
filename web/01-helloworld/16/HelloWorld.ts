import {CustomaryElement, CustomaryOptions} from "#customary";

export class HelloWorld extends CustomaryElement {
    static customary: CustomaryOptions<HelloWorld> = {
        name: 'hello-world',
        hooks: {externalLoader: {import_meta: import.meta, css_dont: true}}
    }
}