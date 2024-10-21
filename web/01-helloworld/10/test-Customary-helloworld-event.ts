import 'mocha';
import {CustomaryTestingQueries} from "../../test/CustomaryTestingQueries.js";
import {page_html_of_test_js, suite} from "../../test/suite.js";
import {assert} from "chai";

const PAGE = page_html_of_test_js(import.meta);

describe(suite(PAGE), async function (){
    this.timeout(4000);
    this.slow(500);

    let window: Window;

    before(() => window = globalThis.window.open(PAGE)!);
    after(() => window.close());

    describe('on page load', async function () {
        let element: HTMLElement;
        let container: ShadowRoot;
        function assert_element() {
            element = window.document.querySelector('hello-world')!;
            container = element.shadowRoot!;
        }
        it('render custom element', async function () {
            this.retries(64);
            assert_element();
            CustomaryTestingQueries.findByTextContent(container, 'Hello Customary !', {selector: 'span'});
        });
        it('click to change element', async function () {
            (container.querySelector('button') as HTMLButtonElement).click();
        });
        it('assert changes to custom element', async function () {
            this.retries(16);
            assert.isAbove(
                Number.parseFloat(element.style.fontSize.replace('px', '')),
                40
            );
        });
    });
});
