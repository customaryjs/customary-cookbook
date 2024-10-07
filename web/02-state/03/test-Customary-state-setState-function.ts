import 'mocha';
import {CustomaryTestingQueries} from "../../test/CustomaryTestingQueries.js";
import {suite} from "../../test/suite.js";

const PAGE = 'web/02-state/03/Customary-state-setState-function.html';
const URL = `../../${PAGE}`;

describe(suite(PAGE), async function (){
    this.timeout(4000);
    this.slow(500);

    let window: Window;

    before(() => window = globalThis.window.open(URL)!);
    after(() => window.close());

    describe('on page load', async function () {
        let container: ShadowRoot;
        function assert_element() {
            container = window.document.querySelector('unit-test-card')!.shadowRoot!;
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
            assert_textContent("Hello Customary !");
        });
        it('click to change text content', async function () {
            (container.querySelector('button') as HTMLButtonElement).click();
        });
        it('render changed custom element text content', async function () {
            this.retries(16);
            assert_textContent("! yramotsuC olleH");
        });
    });
});
