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
        let element;
        function assert_element() {
            element = CT.querySelector('events-default-recipe', window);
        }
        it('looks good', async function () {
            this.retries(64);
            assert_element();
            CT.spot('Ready to click!', element, { selectors: 'h1' });
        });
        it('interact', async function () {
            element.click();
        });
        it('looks good', async function () {
            this.retries(16);
            assert.isAbove(Number.parseFloat(element.style.fontSize.replace('px', '')), 40);
        });
    });
});
//# sourceMappingURL=test-Customary-events-default.js.map