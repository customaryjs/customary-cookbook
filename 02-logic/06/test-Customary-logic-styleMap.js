import 'mocha';
import * as CT from "#customary-testing";
import { test_suite } from "../../test/suite.js";
import { assert } from "chai";
const suite = test_suite(import.meta);
describe(suite.title, async function () {
    this.timeout(4000);
    this.slow(500);
    let window;
    before(async () => window = await CT.open(suite.subject_html));
    after(() => window.close());
    describe('happy day', async function () {
        it('looks good', async function () {
            this.retries(64);
            const element = CT.querySelector('logic-styleMap-recipe', window);
            const div = CT.querySelector('div', element);
            // Computed style check might be safer if style attribute parsing varies
            // But styleMap sets inline styles, so checking style property on element should work.
            assert.equal(div.style.color, 'red');
            assert.equal(div.style.fontSize, '20px');
        });
    });
});
//# sourceMappingURL=test-Customary-logic-styleMap.js.map