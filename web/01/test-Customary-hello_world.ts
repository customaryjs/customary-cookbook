import * as chai from 'chai';
import 'mocha';

const TEST = chai.assert;

const PAGE = '../01/Customary-hello_world.html';

export class Test01 { static add_tests() {
    describe('Customary-hello_world.html', async function (){
        this.timeout(4000);
        this.slow(500);
        this.retries(6);

        let window: Window;

        before(() => window = globalThis.window.open(PAGE)!);
        after(() => window.close());

        describe('on page load', async function () {
            it('render expected custom element text content', async function () {
                const element = window.document.body.getElementsByTagName('hello-world')[0];
                const textContentArray: string[] = collectAllTextContent(element!);
                TEST.strictEqual(textContentArray.join(' '), 'Hello Customary !');
            });
        });
    });
}}

function collectAllTextContent(node: Node): string[] {
    if (node.textContent) return [node.textContent];
    if ((node as Element).shadowRoot) return collectAllTextContent((node as Element).shadowRoot!);
    if ((node as Element).tagName === 'SCRIPT') return [];
    if (!node.hasChildNodes()) return [];
    return Array.from(node.childNodes).flatMap(child => collectAllTextContent(child));
}
