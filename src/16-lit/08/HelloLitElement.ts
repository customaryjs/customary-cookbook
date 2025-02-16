import {html, LitElement} from 'lit';
import {property} from 'lit/decorators.js';
import {map} from 'lit/directives/map.js';

export class HelloLitElement extends LitElement {
    
    @property()
    field_property: string = 'FIELD';

    @property({reflect: true})
    attrib: string = 'UNSET';

    @property()
    button_faces: string[] = ['Zero', 'One', 'Two', 'Three'];

    static properties = {
        after: {},
    };

    declare field_constructor: string;

    constructor() {
        super();
        this.field_constructor = 'CONSTRUCTOR';
    }

    protected render() {
        return html`
            
<p>Field: ${this.field_property} </p>
<input .value="${this.field_property}" @input="${this._handleFieldInput}"></input>
<hr>
<p>Constructor: ${this.field_constructor}</p>
<hr>
<p>Attribute: ${this.attrib}</p>
<button @click="${this._setAttribute}">this.setAttribute('attrib'</button>
<button @click="${this._assignProperty}">this.attrib=</button>
<hr>
${map(
    this.button_faces, 
    (item: string, index: number) => 
        html`<button value="${index}" @click="${this._reverseButtonText}">${item}</button>`
)}
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

    private _reverseButtonText(event: Event) {
        const emit_lit_error_ejected = true;
        if (emit_lit_error_ejected)
        {
            const target = event.target as HTMLButtonElement;
            target.innerText = target.innerText.split('').reverse().join('');
        }
        else
        {
            const target = event.target as HTMLButtonElement;
            const index = Number.parseInt(target.value);
            const new_faces = [...this.button_faces];
            new_faces[index] = new_faces[index].split('').reverse().join('');
            this.button_faces = new_faces;
        }
    }
    
    override attributeChangedCallback(property: string, oldValue: string, newValue: string) {
        super.attributeChangedCallback(property, oldValue, newValue);
        console.log(`attributeChangedCallback: ${property} ${oldValue} ${newValue}`);
    }

}
