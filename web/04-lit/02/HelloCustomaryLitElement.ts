import {CustomaryLitElement} from "#customary/lit/CustomaryLitElement.js";
import {CustomaryOptions} from "#customary/CustomaryOptions.js";

export class HelloCustomaryLitElement extends CustomaryLitElement {
	static customary: CustomaryOptions<HelloCustomaryLitElement> = {
		config: {
			name: 'hello-customary-lit',
		}
	}
}
