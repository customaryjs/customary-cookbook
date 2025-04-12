import { CustomaryElement, Customary } from "#customary";
export class HelloWorldPart3 extends CustomaryElement {
    static { this.customary = {
        name: 'hello-world-part-3',
        hooks: { externalLoader: { import_meta: import.meta, css_dont: true } }
    }; }
}
Customary.declare(HelloWorldPart3);
//# sourceMappingURL=HelloWorldPart3.js.map