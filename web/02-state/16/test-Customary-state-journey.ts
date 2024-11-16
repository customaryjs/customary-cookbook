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
