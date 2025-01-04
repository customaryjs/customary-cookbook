import {CustomaryElement, CustomaryOptions} from "#customary";

export class HelloWorldPart2 extends CustomaryElement {
    static customary: CustomaryOptions<HelloWorldPart2> = {
        config: {name: 'hello-world-part-2'},
        hooks: {externalLoader: {import_meta: import.meta, css_dont: true}}
    }
}