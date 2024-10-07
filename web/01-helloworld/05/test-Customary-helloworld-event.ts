import 'mocha';
import {CustomaryTestingQueries} from "../../test/CustomaryTestingQueries.js";
import {suite} from "../../test/suite.js";
import {assert} from "chai";

const PAGE = 'web/01-helloworld/05/Customary-helloworld-event.html';
const URL = `../../${PAGE}`;

describe(suite(PAGE), async function (){
    this.timeout(4000);
    this.slow(500);

    let window: Window;

    before(() => window = globalThis.window.open(URL)!);
    after(() => window.close());

    describe('on page load', async function () {
        let element: HTMLElement;
        let container: ShadowRoot;
        function assert_element() {
            element = window.document.querySelector('hello-world')!;
            container = element.shadowRoot!;
        }
        it('render custom element', async function () {
            this.retries(16);
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
