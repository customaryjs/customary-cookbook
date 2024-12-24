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

    describe('happy day', async function () {
        it('looks good', async function () {
            this.retries(32);
            const element = window.document.querySelector(
                `attributes-composed[call='Are we composed now?']`
            )!;
            CustomaryTestingQueries.findByTextContent(
                element.shadowRoot!,
                'Are we composed now?',
                {selector: 'h1'}
            );
            const firstElementChild = element.firstElementChild!;
            CustomaryTestingQueries.findByTextContent(
                firstElementChild.shadowRoot!,
                'Yes, yes we are.',
                {selector: 'i'}
            );
        });
    });
});
