export class CustomaryTestingQueries {

    static findByTextContent(container: ParentNode, expected: string, {selector}:{selector: string}) {
        const element = container.querySelector(selector);
        if (!element) throw new Error(selector);
        const textContentArray: string[] = collectAllTextContent(element);
        const textContent = textContentArray.join('').trim();
        if (textContent === expected) return element;
        throw new Error(textContent);
    }

}

function collectAllTextContent(node: Node): string[] {
    if ((node as Element).tagName === 'SCRIPT') return [];
    if ((node as Element).shadowRoot) return collectAllTextContent((node as Element).shadowRoot!);
    const textContent = node.textContent?.replace(/\s+/g, ' ');
    if (textContent?.trim?.().length) return [textContent];
    if (node.hasChildNodes()) return Array.from(node.childNodes).flatMap(child => collectAllTextContent(child));
    if (textContent === ' ') return [textContent];
    return [];
}
