import {CustomaryLitElement, CustomaryOptions} from "#customary/index.js";
import {property} from "lit/decorators.js";

export class AttributesComponent extends CustomaryLitElement {

	/*
		!!! IMPORTANT !!!
		@property requires in tsconfig.json:
		"useDefineForClassFields": false
		https://lit.dev/docs/components/decorators/#decorators-typescript
	 */
	@property()
	chord: string = '';

	static customary: CustomaryOptions<AttributesComponent> = {
		config: {name: 'attributes-component'},
		state: {'notes': ["C", "D", "E", "F", "G", "A", "B"]},
		hooks: {externalLoader: {import_meta: import.meta}}
	}

	// noinspection JSUnusedGlobalSymbols
	override updated(changedProperties: Map<string, any>) {
		super.updated(changedProperties);
		if (changedProperties.has('chord')) {
			const el = this;
			const value = el['chord'];
			for (const id of value.split('')) {
				el.shadowRoot!.getElementById(id)!.classList.add('chord');
			}
		}
	}
}
