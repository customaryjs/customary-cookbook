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
        it('render expected custom element text content', async function () {
            this.retries(32);
            CustomaryTestingQueries.findByTextContent(
                window.document.querySelector('story-teller')!.shadowRoot!,
                'He went to space to see the stars. ' +
                'She went to sea to see the stars. ' +
                'We went to shows to see the stars, ' +
                'I went to sleep to see the stars.',
                {selector: 'div'}
            );
        });
    });
});
