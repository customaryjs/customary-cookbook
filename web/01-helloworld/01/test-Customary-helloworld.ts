import 'mocha';
import {CustomaryTestingQueries} from "#customary/testing/CustomaryTestingQueries.js";
import {test_suite} from "../../test/suite.js";

const suite = test_suite(import.meta);

describe(suite.title, async function (){
    this.timeout(4000);
    this.slow(500);

    let window: Window;

    before(() => window = globalThis.window.open(suite.subject_html)!);
    after(() => window.close());

    describe('on page load', async function () {
        it('render expected custom element text content', async function () {
            this.retries(32);
            CustomaryTestingQueries.findByTextContent(window.document, 'Hello Customary !', {selector: 'h1'});
        });
    });
});
