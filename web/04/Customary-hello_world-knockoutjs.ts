import {Customary} from 'customary/Customary.js';
import {KnockoutBridge} from "customary/knockoutjs/KnockoutBridge.js";

export async function bind() {
    await Customary.define();

    const model = {hello: 'Hello', world: 'Customary'};

    const element = document.querySelector('hello-world');
    const documentFragment = element!.shadowRoot!.getRootNode() as DocumentFragment;

    new KnockoutBridge().applyBindingsToDocumentFragment(model, documentFragment);
}
