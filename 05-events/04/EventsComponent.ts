import {CustomaryElement, CustomaryDeclaration, Customary} from "#customary";

// noinspection JSUnusedGlobalSymbols
export class EventsComponent extends CustomaryElement {

	static customary: CustomaryDeclaration<EventsComponent> = {
		name: 'events-component',
		values: {'count': 0, 'description': ''},
		config: {
			state: ['count', 'description'],
		},
		hooks: {
			externalLoader: {import_meta: import.meta},
			events: {
				'button.count': el => el.count = el.count + 1,
				'button.reset': el => el.reset(),
				'button.describe':
					(el: EventsComponent, event: Event, target: EventTarget) => {
						const button = target as HTMLButtonElement;
						el.description =
							`${event.type} on ${button.localName}.${button.className}`;
					},
			},
		},
	}

	declare count: number;
	declare description: string;

	reset() {
		this.count = 0;
		this.description = '';
	}
}

Customary.declare(EventsComponent);
