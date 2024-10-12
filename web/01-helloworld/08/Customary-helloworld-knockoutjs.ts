import {KnockoutBridge as ko} from 'customary/knockoutjs/KnockoutBridge.js';

export async function bind() {
    const model = {
        parts: ko.observableArray([
            {word: 'Hello'},
            {word: 'Customary'},
            {word: '!'},
        ]),
    };
    ko.applyBindings(model, document.querySelector('hello-world')!);
}
