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
            const expected = {
                ":not([user])": "Sign In...",
                "[user='root']": "User: root (admin)",
            };
            for (const [key, value] of Object.entries(expected)) {
                const container = CT.querySelector('body', window);
                CT.spot(value, container, { selectors: `directives-if${key}` });
            }
        });
    });
});
//# sourceMappingURL=test-Customary-directives-if.js.map