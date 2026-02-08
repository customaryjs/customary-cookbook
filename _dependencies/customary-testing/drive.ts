export function input(text: string, element: HTMLInputElement) {
    element.focus();
    element.value += text;
    element.dispatchEvent(new_Event_input());
}

export function textarea(text: string, element: HTMLTextAreaElement) {
    element.focus();
    element.value += text;
    element.dispatchEvent(new_Event_input());
}

export function checkbox(element: HTMLInputElement) {
    element.focus();
    element.click();
    element.dispatchEvent(new_Event_input());
}

function new_Event_input(): Event {
    return new InputEvent("input", {bubbles: true, composed: true});
}
