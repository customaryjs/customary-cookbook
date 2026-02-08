import { CustomaryElement, Customary } from "#customary";
// noinspection JSUnusedGlobalSymbols
export class AttributesComponent extends CustomaryElement {
    static customary = {
        name: 'attributes-component',
        values: { 'notes': ["C", "D", "E", "F", "G", "A", "B"] },
        config: {
            attributes: ['chord'],
            state: ['scale'],
        },
        hooks: {
            externalLoader: { import_meta: import.meta },
            changes: {
                'chord': (el, a) => el.scale = el.notes.map(note => ({ note, bright: a.includes(note) })),
            },
        },
    };
}
Customary.declare(AttributesComponent);
//# sourceMappingURL=AttributesComponent.js.map