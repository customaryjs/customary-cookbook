import {html, LitElement} from 'lit';
import {property} from 'lit/decorators.js';

export class HelloLitElement extends LitElement {
    
    @property()
    field_property: string = 'FIELD';

    @property({reflect: true})
    attrib: string = 'UNSET';

    static properties = {
        after: {},
    };

    declare completed: string;

    constructor() {
        super();
        this.completed = 'CONSTRUCTOR';
    }

    protected render() {
        return html`
            
<p>Field: ${this.field_property} </p>
<input .value="${this.field_property}" @input="${this._handleFieldInput}"></input>
<hr>
<p>Constructor: ${this.completed}</p>
<hr>
<p>Attribute: ${this.attrib}</p>
<button @click="${this._setAttribute}">this.setAttribute('attrib'</button>
<button @click="${this._assignProperty}">this.attrib=</button>
<hr>

`;
    }

    private _setAttribute() {
        this.setAttribute('attrib', "SET ATTRIBUTE");
    }

    private _assignProperty() {
        this.attrib = "ASSIGN ATTRIBUTE";
    }

    private _handleFieldInput(event: InputEvent) {
        this.field_property = (event.target as HTMLInputElement).value;
    }

    override attributeChangedCallback(property: string, oldValue: string, newValue: string) {
        super.attributeChangedCallback(property, oldValue, newValue);
        console.log(`attributeChangedCallback: ${property} ${oldValue} ${newValue}`);
    }

}
