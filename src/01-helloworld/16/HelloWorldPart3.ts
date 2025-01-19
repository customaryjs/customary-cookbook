import {CustomaryElement, CustomaryOptions} from "#customary";

export class HelloWorldPart3 extends CustomaryElement {
    static customary: CustomaryOptions<HelloWorldPart3> = {
        name: 'hello-world-part-3',
        hooks: {externalLoader: {import_meta: import.meta, css_dont: true}}
    }
}