var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { CustomaryElement, Customary } from "#customary";
import { property } from "@lit/reactive-element/decorators/property.js";
// noinspection JSUnusedGlobalSymbols
export class AttributesComponent extends CustomaryElement {
    constructor() {
        super(...arguments);
        /*
            !!! IMPORTANT !!!
            @property requires in tsconfig.json:
            "useDefineForClassFields": false
            https://lit.dev/docs/components/decorators/#decorators-typescript
         */
        this.chord = '';
    }
    static { this.customary = {
        name: 'attributes-component',
        values: { 'notes': ["C", "D", "E", "F", "G", "A", "B"] },
        hooks: {
            externalLoader: { import_meta: import.meta },
            changes: {
                'chord': (el, a) => a.split('').forEach(id => el.shadowRoot.getElementById(id).classList.add('chord'))
            }
        }
    }; }
}
__decorate([
    property()
], AttributesComponent.prototype, "chord", void 0);
Customary.declare(AttributesComponent);
//# sourceMappingURL=AttributesComponent.js.map