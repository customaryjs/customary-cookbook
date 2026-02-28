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
            const element = CT.querySelector('logic-nested-for-recipe', window);
            CT.spot('Fruits', element, { selectors: 'h2' });
            CT.spot('Citrus', element, { selectors: 'h3' });
            CT.spot('Orange', element, { selectors: 'li' });
        });
    });
});
//# sourceMappingURL=test-Customary-logic-nested-for.js.map