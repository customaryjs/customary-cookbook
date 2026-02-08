import {CustomaryElement, CustomaryDeclaration, Customary} from "#customary";

// noinspection JSUnusedGlobalSymbols
export class AttributesComponent extends CustomaryElement {

	static customary: CustomaryDeclaration<AttributesComponent> = {
		name: 'attributes-component',
		values: {'notes': ["C", "D", "E", "F", "G", "A", "B"]},
		config: {
			attributes: ['chord'],
			state: ['scale'],
		},
		hooks: {
			externalLoader: {import_meta: import.meta},
			changes: {
				'chord': (el: AttributesComponent, a: string) =>
					el.scale = el.notes.map(note => ({note, bright: a.includes(note)})),
			},
		},
	}
	declare notes: string[];
	declare scale: {note: string, bright: boolean}[];
}

Customary.declare(AttributesComponent);
