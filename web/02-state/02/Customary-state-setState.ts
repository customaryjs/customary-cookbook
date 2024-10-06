import {Customary} from 'customary/Customary.js';
import {CustomaryHTMLElement} from 'customary/CustomaryHTMLElement.js';

export async function define() {
    await Customary.define();
    const customaryHTMLElement = document.querySelector('unit-test-card') as CustomaryHTMLElement;
    const button = customaryHTMLElement.shadowRoot!.querySelector('button[data-customary]') as HTMLButtonElement;
    button.onclick = (mouseEvent: MouseEvent)=> {
        const target = mouseEvent.target as HTMLButtonElement;
        const parent = target.parentNode as DocumentFragment;
        const shadowRoot = parent as ShadowRoot;
        const host = shadowRoot.host as CustomaryHTMLElement;
        setState(host);
    };
}

function setState(el: CustomaryHTMLElement): void {
    el.setState({page: 'Hello', test: 'Customary!'});
}
