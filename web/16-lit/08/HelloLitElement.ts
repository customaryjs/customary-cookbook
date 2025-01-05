import {html, LitElement} from 'lit';
import {property} from 'lit/decorators.js';

export class HelloLitElement extends LitElement {
    
    @property()
    incomplete: string = 'FIELD';

    @property({reflect: true})
    attrib: string = 'UNSET';

    static properties = {
        after: {},
    };

    constructor() {
        super();
        (this as any).completed = 'CONSTRUCTOR';
    }

    protected render() {
        console.log('render');

        const template: HTMLTemplateElement =
            findHTMLTemplateElementInDOMDocument(this.tagName.toLowerCase())!;

        const s = template.innerHTML;
        const middle = eval(`html\`${s}\``);

        return html`${middle}`;
    }

    private _setAttribute() {
        this.setAttribute('attrib', "SET ATTRIBUTE");
    }

    private _assignProperty() {
        this.attrib = "ASSIGN ATTRIBUTE";
    }

    override attributeChangedCallback(property: string, oldValue: string, newValue: string) {
        super.attributeChangedCallback(property, oldValue, newValue);
        console.log(`attributeChangedCallback: ${property} ${oldValue} ${newValue}`);
    }

}

function findHTMLTemplateElementInDOMDocument(name: string): HTMLTemplateElement | undefined {
    return document.querySelector(`template[data-customary-name='${name}']`) as HTMLTemplateElement ?? undefined;
}
