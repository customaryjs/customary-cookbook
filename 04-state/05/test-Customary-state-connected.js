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
            CT.spot("02-state/05/test-Customary-state-connected.ts", CT.querySelector('recipe-card', window), { selectors: 'div.c > div' });
        });
    });
});
//# sourceMappingURL=test-Customary-state-connected.js.map