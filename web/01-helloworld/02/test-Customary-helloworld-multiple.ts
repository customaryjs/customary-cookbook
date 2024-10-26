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
            CustomaryTestingQueries.findByTextContent(window.document, 'Hello Customary !', {selector: 'h1'});
        });
    });
});
