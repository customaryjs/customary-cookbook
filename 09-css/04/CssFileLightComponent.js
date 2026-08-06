import { CustomaryElement, Customary } from "#customary";
// noinspection JSUnusedGlobalSymbols
export class CssFileLightComponent extends CustomaryElement {
    static customary = {
        name: 'css-file-light-component',
        config: {
            construct: { shadowRootDont: true },
        },
        hooks: {
            externalLoader: { import_meta: import.meta },
        },
    };
}
Customary.declare(CssFileLightComponent);
//# sourceMappingURL=CssFileLightComponent.js.map