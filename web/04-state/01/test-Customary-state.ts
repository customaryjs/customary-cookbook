import 'mocha';
import {CustomaryTestingQueries} from "#customary-testing";
import {test_suite} from "../../test/suite.js";

const suite = test_suite(import.meta);

describe(suite.title, async function (){
    this.timeout(4000);
    this.slow(500);

    let window: Window;

    before(() => window = globalThis.window.open(suite.subject_html)!);
    after(() => window.close());

    describe('happy day', async function () {
        it('looks good', async function () {
            this.retries(64);
            CustomaryTestingQueries.findByTextContent(
                window.document.querySelector('recipe-card')!.shadowRoot!,
                "02-state/01/test-Customary-state.ts",
                {selector: 'div.c > div'}
            );
        });
    });
});
