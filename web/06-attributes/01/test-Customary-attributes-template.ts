import {assert} from "chai";
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
            this.retries(64);
            for (const color of ["red", "green", "blue"]) {
                const container =
                    window.document.querySelector(`attributes-template[color='${color}']`)!.shadowRoot!;
                CustomaryTestingQueries.findByTextContent(
                    container,
                    `caption: ${color.toUpperCase()}color: ${color}`,
                    {selector: 'h1'}
                );
                assert.strictEqual(
                    container.querySelector('h1')!.getAttribute('style'),
                    `color: ${color}`
                );
            }
        });
    });
});
