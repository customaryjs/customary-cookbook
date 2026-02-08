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
function new_Event_input() {
    return new InputEvent("input", { bubbles: true, composed: true });
}
//# sourceMappingURL=drive.js.map