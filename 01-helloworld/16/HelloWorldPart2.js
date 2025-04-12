import { CustomaryElement, Customary } from "#customary";
export class HelloWorldPart2 extends CustomaryElement {
    static { this.customary = {
        name: 'hello-world-part-2',
        hooks: { externalLoader: { import_meta: import.meta, css_dont: true } }
    }; }
}
Customary.declare(HelloWorldPart2);
//# sourceMappingURL=HelloWorldPart2.js.map