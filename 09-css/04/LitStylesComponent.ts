import {CustomaryElement, CustomaryDeclaration, Customary} from "#customary";
import {css} from "#customary/lit";

// noinspection JSUnusedGlobalSymbols
export class LitStylesComponent extends CustomaryElement {

	static customary: CustomaryDeclaration<LitStylesComponent> = {
		name: 'lit-styles-component',
		config: {
			construct: {shadowRootDont: false},
		},
		hooks: {
			externalLoader: {import_meta: import.meta, css_dont: true},
		},
	}

	static styles = css`
		p {
			background-color: gold;
			color: navy;
			font-style: normal;
			border: medium solid navy;
			padding: 6px;
		}
	`;
}

Customary.declare(LitStylesComponent);
