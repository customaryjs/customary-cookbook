import { assert } from "chai";
import 'mocha';
import * as CT from "#customary-testing";
import { test_suite } from "../../test/suite.js";
const suite = test_suite(import.meta);
describe(suite.title, async function () {
    this.timeout(4000);
    this.slow(500);
    let window;
    before(() => window = CT.open(suite.subject_html));
    after(() => window.close());
    describe('happy day', async function () {
        it('looks good', async function () {
            this.retries(64);
            for (const color of ["red", "green", "blue"]) {
                const container = CT.querySelector(`attributes-template[color='${color}']`, window);
                CT.spot(`caption: ${color.toUpperCase()}color: ${color}`, container, { selectors: 'h1' });
                assert.strictEqual(CT.querySelector('h1', container).getAttribute('style'), `color: ${color}`);
            }
        });
    });
});
//# sourceMappingURL=test-Customary-attributes-template.js.map