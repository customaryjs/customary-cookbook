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
        let el, elA, elB;
        const a = 'Spinach', b = 'Blueberry';
        it('looks good', async function () {
            this.retries(128);
            el = CT.querySelector('expressions-property-recipe', window);
            elA = CT.spot(a, el, { selectors: 'li' }).parentElement;
            elB = CT.spot(b, el, { selectors: 'li' }).parentElement;
        });
        it('interact', async function () {
            CT.querySelector('button', elA).click();
            CT.querySelector('button', elB).click();
        });
        it('looks good', async function () {
            this.retries(128);
            CT.spot(`${a} ${b}`, el, { selectors: '.basket' });
        });
    });
});
//# sourceMappingURL=test-Customary-expressions-property.js.map