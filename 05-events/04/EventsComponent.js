import { CustomaryElement, Customary } from "#customary";
// noinspection JSUnusedGlobalSymbols
export class EventsComponent extends CustomaryElement {
    static customary = {
        name: 'events-component',
        values: { 'count': 0, 'description': '' },
        config: {
            state: ['count', 'description'],
        },
        hooks: {
            externalLoader: { import_meta: import.meta },
            events: {
                'button.count': el => el.count = el.count + 1,
                'button.reset': el => el.reset(),
                'button.describe': (el, event, target) => {
                    const button = target;
                    el.description =
                        `${event.type} on ${button.localName}.${button.className}`;
                },
            },
        },
    };
    reset() {
        this.count = 0;
        this.description = '';
    }
}
Customary.declare(EventsComponent);
//# sourceMappingURL=EventsComponent.js.map