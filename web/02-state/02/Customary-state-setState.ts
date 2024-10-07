import {Customary} from 'customary/Customary.js';
import {CustomaryHTMLElement} from 'customary/CustomaryHTMLElement.js';
import {set_button_onclick_customary} from "./set_button_onclick_customary.js";

export async function define() {
    await Customary.define();
    const customaryHTMLElement = document.querySelector('unit-test-card') as CustomaryHTMLElement;
    set_button_onclick_customary(
        customaryHTMLElement.shadowRoot!.querySelector('button[data-customary]') as HTMLButtonElement,
        (el: CustomaryHTMLElement) => setState(el)
    );
}

function setState(el: CustomaryHTMLElement): void {
    el.setState({test: 'Hello Customary !'});
}
