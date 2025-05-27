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
            for (const s of ["0: Peas", "1: Carrots", "2: Tomatoes"]) {
                const container = CT.querySelector('directives-for', window);
                CT.spot(s, container, { selectors: 'li' });
            }
        });
    });
});
//# sourceMappingURL=test-Customary-directives-for.js.map