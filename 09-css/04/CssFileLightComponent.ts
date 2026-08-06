import {CustomaryElement, CustomaryDeclaration, Customary} from "#customary";

// noinspection JSUnusedGlobalSymbols
export class CssFileLightComponent extends CustomaryElement {

	static customary: CustomaryDeclaration<CssFileLightComponent> = {
		name: 'css-file-light-component',
		config: {
			construct: {shadowRootDont: true},
		},
		hooks: {
			externalLoader: {import_meta: import.meta},
		},
	}
}

Customary.declare(CssFileLightComponent);
