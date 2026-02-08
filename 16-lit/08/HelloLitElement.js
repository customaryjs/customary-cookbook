var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { html, LitElement } from 'lit';
import { property } from 'lit/decorators.js';
import { map } from 'lit/directives/map.js';
export class HelloLitElement extends LitElement {
    field_property = 'FIELD';
    attrib = 'UNSET';
    button_faces = ['Zero', 'One', 'Two', 'Three'];
    static properties = {
        after: {},
    };
    constructor() {
        super();
        this.field_constructor = 'CONSTRUCTOR';
    }
    render() {
        return html `
            
<p>Field: ${this.field_property} </p>
<input .value="${this.field_property}" @input="${this._handleFieldInput}"></input>
<hr>
<p>Constructor: ${this.field_constructor}</p>
<hr>
<p>Attribute: ${this.attrib}</p>
<button @click="${this._setAttribute}">this.setAttribute('attrib'</button>
<button @click="${this._assignProperty}">this.attrib=</button>
<hr>
${map(this.button_faces, (item, index) => html `<button value="${index}" @click="${this._reverseButtonText}">${item}</button>`)}
<hr>
`;
    }
    _setAttribute() {
        this.setAttribute('attrib', "SET ATTRIBUTE");
    }
    _assignProperty() {
        this.attrib = "ASSIGN ATTRIBUTE";
    }
    _handleFieldInput(event) {
        this.field_property = event.target.value;
    }
    _reverseButtonText(event) {
        const emit_lit_error_ejected = true;
        if (emit_lit_error_ejected) {
            const target = event.target;
            target.innerText = target.innerText.split('').reverse().join('');
        }
        else {
            const target = event.target;
            const index = Number.parseInt(target.value);
            const new_faces = [...this.button_faces];
            new_faces[index] = new_faces[index].split('').reverse().join('');
            this.button_faces = new_faces;
        }
    }
    attributeChangedCallback(property, oldValue, newValue) {
        super.attributeChangedCallback(property, oldValue, newValue);
        console.log(`attributeChangedCallback: ${property} ${oldValue} ${newValue}`);
    }
}
__decorate([
    property()
], HelloLitElement.prototype, "field_property", void 0);
__decorate([
    property({ reflect: true })
], HelloLitElement.prototype, "attrib", void 0);
__decorate([
    property()
], HelloLitElement.prototype, "button_faces", void 0);
//# sourceMappingURL=HelloLitElement.js.map