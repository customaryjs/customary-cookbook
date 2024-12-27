import {CustomaryLitElement, CustomaryOptions} from "#customary/index.js";
import {property} from "@lit/reactive-element/decorators/property.js";

// noinspection JSUnusedGlobalSymbols
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
		hooks: {
			externalLoader: {import_meta: import.meta},
			changes: {
				'chord': (el: AttributesComponent, a: string) =>
						a.split('').forEach(
							id => el.shadowRoot!.getElementById(id)!.classList.add('chord')
						)
			}
		}
	}
}
