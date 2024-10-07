import {Customary} from 'customary/Customary.js';
import {CustomaryHTMLElement} from 'customary/CustomaryHTMLElement.js';

export async function define() {
    await Customary.define('unit-test-card', {events: [{
        selector: 'button',
        listener: (el: CustomaryHTMLElement) => el.setState({test: 'Hello Customary !'})
    }]});
}
