import {html, LitElement} from 'lit';
import {customElement, property} from 'lit/decorators.js';

import {findHTMLTemplateElementInDOMDocument} from "#customary/CustomaryHTMLTemplates.js";

export class HelloLitElement extends LitElement {
    
    @property()
    incomplete: string = 'INCOMPLETE';

    static properties = {
        after: {},
    };

    constructor() {
        super();
        (this as any).completed = 'COMPLETED';
    }

    protected render() {
        const template: HTMLTemplateElement =
            findHTMLTemplateElementInDOMDocument(this.tagName.toLowerCase())!;

        /*
        const documentFragment = template.content;
        const clone: Node = documentFragment.cloneNode(true);
        const dom_node = clone;
        const middle = dom_node;
         */

        /*
        const s = template.innerHTML;
        const a = [`${s}`] as any;
        a.raw = a;
        const html_from_template = html(a);
        const middle = html_from_template;
         */

        /*
        const s = template.innerHTML;

        // https://stackoverflow.com/a/51012181/
        const a = [`${s}`] as any;
        a.raw = a;
        return html(a);
         */

        // return eval(`html\`${html_string}\``);

        const s = template.innerHTML;
        const middle = eval(`html\`${s}\``);

        return html`${middle}`;
    }
}
