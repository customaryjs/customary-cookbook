import {Customary} from 'customary/Customary.js';
import * as ko from 'knockout';

const kog = ko;
const koh = globalThis.ko;

export async function defineCustomElements() {
    await Customary.define();
    const model = {hello: 'Hello', world: 'Customary'};
    const element = document.getElementsByTagName('hello-world')[0];
    const documentFragment: Node = element.shadowRoot!.getRootNode();
    documentFragment.childNodes.forEach((node: Node) => {
        if (node.nodeType === 1 || node.nodeType === 8) koh.applyBindings(model, node);
    });
}
