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
            CT.spot('He went to space to see the stars. ' +
                'She went to sea to see the stars. ' +
                'We went to shows to see the stars, ' +
                'I went to sleep to see the stars.', CT.querySelector('story-teller', window), { selectors: 'div' });
        });
    });
});
//# sourceMappingURL=test-Customary-state-journey.js.map