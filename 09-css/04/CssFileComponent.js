import { CustomaryElement, Customary } from "#customary";
// noinspection JSUnusedGlobalSymbols
export class CssFileComponent extends CustomaryElement {
    static customary = {
        name: 'css-file-component',
        config: {
            construct: { shadowRootDont: false },
        },
        hooks: {
            externalLoader: { import_meta: import.meta },
        },
    };
}
Customary.declare(CssFileComponent);
//# sourceMappingURL=CssFileComponent.js.map