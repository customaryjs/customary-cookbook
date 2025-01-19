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
            const expected = {
                light: "Light mode",
                dark: "Dark mode",
                other: "System default"
            }
            for (const entry of Object.entries(expected)) {
                CustomaryTestingQueries.findByTextContent(
                    window.document.querySelector(`directives-choose[mode='${entry[0]}']`)!.shadowRoot!,
                    entry[1],
                    {selector: 'h1'}
                );
            }
        });
    });
});
