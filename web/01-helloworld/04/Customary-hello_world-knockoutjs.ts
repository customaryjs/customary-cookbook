import {Customary} from 'customary/Customary.js';
import {KnockoutBridge} from 'customary/knockoutjs/KnockoutBridge.js';

export async function bind() {
    await Customary.define();

    const ko = new KnockoutBridge();

    const model = {
        parts: ko.observableArray([
            {word: 'Hello'},
            {word: 'Customary'},
            {word: '!'},
        ]),
    };

    ko.applyBindings(model, document.querySelector('hello-world')!);
}
