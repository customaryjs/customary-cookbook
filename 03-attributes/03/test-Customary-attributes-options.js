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
        const tasks = ["open", "to do", "doing", "done"];
        it('looks good', async function () {
            this.retries(32);
            for (const task of tasks) {
                const container = CT.querySelector(`attributes-options[task='${task}']`, window);
                CT.spot(`${task}`, container, { selectors: 'h1' });
            }
        });
        let checkbox;
        it('interact', async function () {
            const el = CT.querySelector(`attributes-options[task='to do']`, window);
            checkbox = CT.querySelector('input', el);
            checkbox.click();
        });
        it('looks good', async function () {
            this.retries(32);
            assert.ok(checkbox.checked);
            for (const task of tasks) {
                const element = window.document.querySelector(`attributes-options[task='${task}']`);
                const done = element.hasAttribute('done');
                const container = element.shadowRoot;
                const checkbox = container.querySelector('input');
                assert.strictEqual(checkbox.checked, done);
                const h1 = container.querySelector('h1');
                assert.strictEqual(h1.classList.contains('done'), done);
            }
        });
    });
});
//# sourceMappingURL=test-Customary-attributes-options.js.map