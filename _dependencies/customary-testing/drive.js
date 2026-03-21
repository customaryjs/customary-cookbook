export function input(text, element) {
    element.focus();
    element.value += text;
    element.dispatchEvent(new_Event_input());
}
export function textarea(text, element) {
    element.focus();
    element.value += text;
    element.dispatchEvent(new_Event_input());
}
export function checkbox(element) {
    element.focus();
    element.click();
    element.dispatchEvent(new_Event_input());
}
export function select(value, element) {
    element.focus();
    element.value = value;
    element.dispatchEvent(new_Event_input());
}
export function keydown(keyboardEventInit, target) {
    target.dispatchEvent(new KeyboardEvent('keydown', {
        ...keyboardEventInit,
        bubbles: true, composed: true
    }));
}
function new_Event_input() {
    return new InputEvent("input", { bubbles: true, composed: true });
}
//# sourceMappingURL=drive.js.map