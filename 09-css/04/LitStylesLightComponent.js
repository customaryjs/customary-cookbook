import { CustomaryElement, Customary } from "#customary";
import { css } from "#customary/lit";
// noinspection JSUnusedGlobalSymbols
export class LitStylesLightComponent extends CustomaryElement {
    static customary = {
        name: 'lit-styles-light-component',
        config: {
            construct: { shadowRootDont: true },
        },
        hooks: {
            externalLoader: { import_meta: import.meta, css_dont: true },
        },
    };
    static styles = css `
		p {
			background-color: gold;
			color: navy;
			font-style: normal;
			border: medium solid navy;
			padding: 6px;
		}
	`;
}
Customary.declare(LitStylesLightComponent);
//# sourceMappingURL=LitStylesLightComponent.js.map