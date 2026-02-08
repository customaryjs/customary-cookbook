import { CustomaryElement, Customary } from "#customary";
export class HelloWorldPart1 extends CustomaryElement {
    static customary = {
        name: 'hello-world-part-1',
        hooks: { externalLoader: { import_meta: import.meta, css_dont: true } }
    };
}
Customary.declare(HelloWorldPart1);
//# sourceMappingURL=HelloWorldPart1.js.map