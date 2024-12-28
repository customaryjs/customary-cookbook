import {CustomaryElement, CustomaryOptions} from "#customary";

export class HelloWorldPart3 extends CustomaryElement {
    static customary: CustomaryOptions<HelloWorldPart3> = {
        config: {name: 'hello-world-part-3'},
        hooks: {externalLoader: {import_meta: import.meta}}
    }
}