import 'mocha';
import {CustomaryTestingQueries} from "customary/testing/CustomaryTestingQueries.js";
import {page_html_of_test_js, suite} from "../../test/suite.js";

const PAGE = page_html_of_test_js(import.meta);

describe(suite(PAGE), async function (){
    this.timeout(4000);
    this.slow(500);

    let window: Window;

    before(() => window = globalThis.window.open(PAGE)!);
    after(() => window.close());

    describe('on page load', async function () {
        let container: ShadowRoot;
        function assert_element() {
            container = window.document.querySelector('tutorial-card')!.shadowRoot!;
        }
        function assert_textContent(textContent: string) {
            CustomaryTestingQueries.findByTextContent(
                container, textContent,
                {selector: 'div.c > div'}
            );
        }
        it('render expected custom element text content', async function () {
            this.retries(64);
            assert_element();
            assert_textContent("02-state/02/test-Customary-state-setState.ts");
        });
        it('click to change text content', async function () {
            (container.querySelector('button') as HTMLButtonElement).click();
        });
        it('render changed custom element text content', async function () {
            this.retries(16);
            assert_textContent("Hello Customary !");
        });
    });
});
