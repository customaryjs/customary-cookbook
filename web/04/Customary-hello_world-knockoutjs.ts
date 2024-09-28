import {Customary} from 'customary/Customary.js';
import * as ko_namespace from 'knockout';

export async function defineCustomElements() {
    await Customary.define();
    const model = {hello: 'Hello', world: 'Customary'};
    const element = document.getElementsByTagName('hello-world')[0];
    const documentFragment = element.shadowRoot!.getRootNode() as DocumentFragment;
    applyBindingsToDocumentFragment(documentFragment, model);
}

function applyBindingsToDocumentFragment(documentFragment: DocumentFragment, model: any) {
    const ko = 'applyBindings' in ko_namespace ? ko_namespace : globalThis.ko;

    documentFragment.childNodes.forEach((node: Node) => {
        if (node.nodeType === 1 || node.nodeType === 8) {
            ko.applyBindings(model, node);
        }
    });
}
