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
            for (const s of ["0: Peas", "1: Carrots", "2: Tomatoes"]) {
                CustomaryTestingQueries.findByTextContent(
                    window.document.querySelector('directives-for')!.shadowRoot!,
                    s,
                    {selector: 'li'}
                );
            }
        });
    });
});
