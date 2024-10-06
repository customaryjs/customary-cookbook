import {Customary} from 'customary/Customary.js';
import {KnockoutBridge as ko} from 'customary/knockoutjs/KnockoutBridge.js';

export async function bind() {
    await Customary.define();

    const model = {
        parts: ko.observableArray([
            {word: 'Hello'},
            {word: 'Customary'},
            {word: '!'},
        ]),
    };

    ko.applyBindings(model, document.querySelector('hello-world')!);
}
