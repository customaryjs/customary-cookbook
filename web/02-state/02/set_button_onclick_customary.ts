import {CustomaryHTMLElement} from "customary/CustomaryHTMLElement.js";

export function set_button_onclick_customary(
    button: HTMLButtonElement, fn: (el: CustomaryHTMLElement) => void
) {
    button.onclick = (mouseEvent: MouseEvent) => {
        const target = mouseEvent.target as HTMLButtonElement;
        const parent = target.parentNode as DocumentFragment;
        const shadowRoot = parent as ShadowRoot;
        fn(shadowRoot.host as CustomaryHTMLElement);
    };
}
