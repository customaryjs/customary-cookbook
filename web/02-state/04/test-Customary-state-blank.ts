import 'mocha';
import {CustomaryTestingQueries} from "customary/testing/CustomaryTestingQueries.js";
import {test_suite} from "../../test/suite.js";

const suite = test_suite(import.meta);

describe(suite.title, async function (){
    this.timeout(4000);
    this.slow(500);

    let window: Window;

    before(() => window = globalThis.window.open(suite.subject_html)!);
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
            this.retries(32);
            assert_element();
            assert_textContent("");
        });
        it('click to change text content', async function () {
            (container.querySelector('button') as HTMLButtonElement).click();
        });
        it('render changed custom element text content', async function () {
            this.retries(16);
            assert_textContent("02-state/04/test-Customary-state-blank.ts");
        });
    });
});
